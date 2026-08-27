import React from 'react';
import { 
  ShieldAlert, 
  Wifi, 
  WifiOff, 
  Globe, 
  Send, 
  RefreshCw, 
  MapPin,
  Layers,
  Activity,
  Flame
} from 'lucide-react';
import { LANGUAGES, TRANSLATIONS } from '../data/mockData';

export default function Header({
  selectedZone,
  setSelectedZone,
  monitoringZones,
  lang,
  setLang,
  isOffline,
  setIsOffline,
  onOpenSmsModal,
  lastSyncTime,
  onForceSync,
  onFocusHighRiskMode
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Warning Banner / Resilience Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 font-mono">
        <div className="flex items-center space-x-3">
          <span className="flex items-center text-emerald-400 font-semibold">
            <span className="relative flex h-2 w-2 mr-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            GEORISK-NE TELEM-GRID v4.2
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">
            {t.lastSynced}: <span className="text-amber-300">{lastSyncTime}</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onForceSync}
            className="flex items-center hover:text-emerald-300 transition-colors text-slate-300 cursor-pointer"
            title="Force Telemetry Refresh"
          >
            <RefreshCw className="w-3 h-3 mr-1 animate-spin-slow" />
            <span>Force Sync</span>
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 flex items-center">
            IMD Satellite: <span className="text-emerald-400 ml-1 font-semibold">INSAT-3DR Active</span>
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Branding & Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                GeoRisk <span className="text-orange-600">Sentinel</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-orange-100 text-orange-800 border border-orange-200 rounded-md">
                NE India
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {t.subTitle}
            </p>
          </div>
        </div>

        {/* Action Controls & Resilience Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Zone Selector */}
          <div className="flex items-center bg-slate-100/80 border border-slate-200 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-orange-500 focus-within:bg-white transition-all">
            <MapPin className="w-4 h-4 text-orange-600 mr-2 shrink-0" />
            <select
              value={selectedZone.id}
              onChange={(e) => {
                const zone = monitoringZones.find(z => z.id === e.target.value);
                if (zone) setSelectedZone(zone);
              }}
              className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              {monitoringZones.map(zone => (
                <option key={zone.id} value={zone.id}>
                  {zone.name} ({zone.state})
                </option>
              ))}
            </select>
          </div>

          {/* High Risk Priority Radar Quick Focus Button */}
          <button
            onClick={onFocusHighRiskMode}
            className="flex items-center px-3 py-1.5 rounded-lg text-xs font-extrabold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 shadow-2xs transition-all cursor-pointer"
            title="Focus on High Risk Zones with highest possibility of disaster"
          >
            <Flame className="w-4 h-4 text-red-600 mr-1.5 animate-pulse" />
            <span>High Risk Radar (4)</span>
          </button>

          {/* Offline/Online Resilient Storage Toggle */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isOffline
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 shadow-xs'
                : 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100 shadow-xs'
            }`}
            title="Toggle simulated network disconnection to demonstrate offline indexedDB/localStorage fallback"
          >
            {isOffline ? (
              <>
                <WifiOff className="w-4 h-4 text-amber-600 mr-1.5 animate-pulse" />
                <span>{t.offlineSync}</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 text-emerald-600 mr-1.5" />
                <span>{t.liveMesh} (99.8%)</span>
              </>
            )}
          </button>

          {/* Multilingual Switcher */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2 py-1.5 shadow-2xs">
            <Globe className="w-4 h-4 text-slate-500 mr-1.5" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>
                  {l.native} ({l.label})
                </option>
              ))}
            </select>
          </div>

          {/* Broadcast Disaster SMS Quick Action */}
          <button
            onClick={onOpenSmsModal}
            className="flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            <span>{t.broadcastSms}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
