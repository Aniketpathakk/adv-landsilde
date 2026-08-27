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
  Siren,
  Flame
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
    <div className="georisk-card p-4 bg-gradient-to-r from-red-50/90 via-orange-50/50 to-white border-l-4 border-l-red-600 mb-6 shadow-xs border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Top Warning Strip */}
      <div className="flex items-center justify-between border-b border-red-200/60 pb-2.5 mb-3">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
          </span>
          <span className="text-xs font-extrabold uppercase tracking-tight text-red-900 flex items-center">
            <Siren className="w-4 h-4 mr-1.5 text-red-600 animate-bounce" />
            CRITICAL GEOPHYSICAL ALERT: TRANSBOUNDARY DAM BREACH DETECTED IN NEPAL
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-red-100 text-red-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-red-200">
            SAR RADAR & HYDROGRAPH VERIFIED
          </span>
          <button 
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-slate-700 text-xs font-bold px-1.5 py-0.5 rounded hover:bg-slate-100 transition-colors cursor-pointer"
            title="Dismiss Alert"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Outburst Event Summary */}
        <div className="flex items-start space-x-3 max-w-3xl">
          <div className="p-2.5 bg-red-100 text-red-600 rounded-xl shrink-0 mt-0.5 border border-red-200 shadow-2xs">
            <Waves className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                Dam Breach & GLOF Outburst
              </span>
              <span className="bg-orange-100 text-orange-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-orange-200">
                Upper Bhotekoshi Hydroelectric Impoundment (Nepal)
              </span>
              <span className="text-slate-500 text-xs font-mono">
                Trigger: <strong className="text-slate-800">Yesterday (08:42 UTC)</strong>
              </span>
            </div>

            <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
              Nepal Bhotekoshi Hydro-Dam Core Failure & Transboundary Downstream Outburst
            </h3>
            
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              GeoRisk Telemetry Mesh and Sentinel-1A InSAR radar detected a sudden <strong>184 mm/6h structural crest displacement</strong> and dam wall collapse in Nepal. Outflow discharge spiked to <strong>4,850 m³/s</strong> causing a <strong>+5.8m surge wavefront</strong> moving down the Koshi-Teesta transboundary corridor into North Bihar & West Bengal border districts.
            </p>

            {/* Telemetry Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs font-mono">
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Pore Pressure Surge</span>
                <strong className="text-red-700 text-sm">340.5 kPa</strong> <span className="text-[10px] text-red-600 font-semibold">(+145%)</span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Outburst Wavefront</span>
                <strong className="text-orange-700 text-sm">+5.8 meters</strong> <span className="text-[10px] text-orange-600 font-semibold">(Critical)</span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">SAR Coherence</span>
                <strong className="text-red-700 text-sm">0.12 Discontinuity</strong> <span className="text-[10px] text-red-600 font-semibold">(Collapse)</span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Pop. In Path</span>
                <strong className="text-slate-900 text-sm">85,000+</strong> <span className="text-[10px] text-slate-600 font-semibold">(Evacuate)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Emergency Outburst Workflow Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 justify-center">
          <button
            onClick={onFocusNepalZone}
            className="flex items-center justify-center px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            <span>Locate Nepal GIS Zone</span>
          </button>

          <button
            onClick={onOpenInSarScan}
            className="flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
            <span>Verify SAR Radar Scan</span>
          </button>

          <button
            onClick={onOpenSmsModal}
            className="flex items-center justify-center px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            <span>Broadcast Outburst Alert SMS</span>
          </button>

          <button
            onClick={onDispatchSdrf}
            className="flex items-center justify-center px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
            <span>Dispatch NDRF/SDRF Teams</span>
          </button>
        </div>
      </div>
    </div>
  );
}
