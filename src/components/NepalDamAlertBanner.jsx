import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Waves, 
  Activity, 
  Radio, 
  Send, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2,
  ExternalLink,
  Zap,
  Eye,
  Siren
} from 'lucide-react';

export default function NepalDamAlertBanner({
  onFocusNepalZone,
  onOpenSmsModal,
  onOpenInSarScan,
  onDispatchSdrf,
  isDetected = true
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !isDetected) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-950 via-red-900 to-amber-950 text-white shadow-xl border-2 border-red-600 animate-in fade-in slide-in-from-top-4 duration-500 mb-6">
      {/* Dynamic Animated Warning Top Strip */}
      <div className="bg-red-600 text-white px-4 py-1 flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-200"></span>
          </span>
          <span className="flex items-center">
            <Siren className="w-4 h-4 mr-1.5 animate-bounce" />
            CRITICAL GEOPYSICAL ALERT: TRANSBOUNDARY DAM BREACH DETECTED IN NEPAL
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-black/30 px-2 py-0.5 rounded text-[11px] border border-red-400/30">
            SAR SATELLITE & ACOUSTIC HYDROGRAPH VERIFIED
          </span>
          <button 
            onClick={() => setDismissed(true)}
            className="hover:text-red-200 cursor-pointer text-red-100 font-bold px-1"
            title="Minimize Alert Banner"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Outburst Event Summary */}
        <div className="flex items-start space-x-3 max-w-3xl">
          <div className="p-3 bg-red-600/30 border border-red-500/50 rounded-xl shrink-0 text-red-400 mt-1">
            <Waves className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                Dam Structural Breach & GLOF Outburst
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                Upper Bhotekoshi Hydroelectric Impoundment (Nepal)
              </span>
              <span className="text-slate-300 text-xs font-mono">
                Trigger Time: <strong className="text-white">Yesterday (08:42 UTC)</strong>
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-white tracking-tight leading-snug">
              Nepal Bhotekoshi Hydro-Dam Core Failure & Transboundary Downstream Outburst
            </h3>
            
            <p className="text-xs text-red-100/90 mt-1 leading-relaxed">
              GeoRisk Telemetry Mesh and Sentinel-1A InSAR SAR radar detected a sudden <strong>184 mm/6h structural crest displacement</strong> and dam wall collapse in Nepal. Outflow discharge spiked to <strong>4,850 m³/s</strong> causing a <strong>+5.8m surge wavefront</strong> moving down the Koshi-Teesta transboundary corridor into North Bihar & West Bengal border districts.
            </p>

            {/* Telemetry Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs font-mono">
              <div className="bg-black/40 p-2 rounded-lg border border-red-500/30">
                <span className="text-[10px] text-slate-400 block uppercase">Pore Pressure Surge</span>
                <strong className="text-red-400 text-sm">340.5 kPa</strong> <span className="text-[10px] text-red-300">(+145%)</span>
              </div>

              <div className="bg-black/40 p-2 rounded-lg border border-red-500/30">
                <span className="text-[10px] text-slate-400 block uppercase">Outburst Wavefront</span>
                <strong className="text-amber-400 text-sm">+5.8 meters</strong> <span className="text-[10px] text-amber-300">(Critical)</span>
              </div>

              <div className="bg-black/40 p-2 rounded-lg border border-red-500/30">
                <span className="text-[10px] text-slate-400 block uppercase">SAR Phase Coherence</span>
                <strong className="text-red-400 text-sm">0.12 Discontinuity</strong> <span className="text-[10px] text-red-300">(Wall Structural Collapse)</span>
              </div>

              <div className="bg-black/40 p-2 rounded-lg border border-red-500/30">
                <span className="text-[10px] text-slate-400 block uppercase">Pop. In Inundation Path</span>
                <strong className="text-emerald-300 text-sm">85,000+</strong> <span className="text-[10px] text-slate-300">(Border Evac)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Emergency Outburst Workflow Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 justify-center">
          <button
            onClick={onFocusNepalZone}
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-xs rounded-lg shadow-md transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 mr-1.5" />
            <span>Locate Nepal GIS Zone</span>
          </button>

          <button
            onClick={onOpenInSarScan}
            className="flex items-center justify-center px-4 py-2 bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs rounded-lg border border-slate-600 shadow-sm transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 mr-1.5 text-cyan-400" />
            <span>Verify SAR Radar Scan</span>
          </button>

          <button
            onClick={onOpenSmsModal}
            className="flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-lg shadow-md transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 mr-1.5" />
            <span>Broadcast Outburst Alert SMS</span>
          </button>

          <button
            onClick={onDispatchSdrf}
            className="flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 mr-1.5" />
            <span>Dispatch NDRF/SDRF Teams</span>
          </button>
        </div>
      </div>
    </div>
  );
}
