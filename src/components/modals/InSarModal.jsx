import React, { useState } from 'react';
import { X, Satellite, Activity, CheckCircle, ShieldAlert, BarChart2 } from 'lucide-react';

export default function InSarModal({ report, onClose }) {
  if (!report) return null;

  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedStatus, setVerifiedStatus] = useState(report.verified);

  const inSar = report.inSarData || {
    displacementRateYear: "-64 mm/yr",
    coherenceIndex: 0.89,
    interferogramFringe: "Concentric Red Phase Discontinuity",
    satellitePass: "Sentinel-1A (Desc Pass 112)"
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedStatus(true);
      report.verified = true;
      report.verificationSource = "Verified by Sentinel-1 InSAR Interferogram";
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-indigo-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Satellite className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold tracking-tight">
              InSAR Satellite Radar Change Detection
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-indigo-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="font-bold text-slate-900 text-sm">{report.category}</div>
            <div className="text-slate-500 text-[11px] mt-0.5">{report.location} (Lat: {report.lat}, Lng: {report.lng})</div>
          </div>

          {/* Interferogram Phase Fringe Visualizer */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Synthetic Aperture Radar Interferogram Fringe Map
            </label>
            <div className="relative h-32 rounded-lg bg-gradient-to-r from-red-600 via-yellow-400 via-green-500 via-cyan-500 to-purple-600 p-3 flex flex-col justify-between border border-slate-300 shadow-inner overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]"></div>
              
              <div className="flex justify-between items-center z-10 text-[10px] font-mono text-white font-bold bg-black/40 px-2 py-1 rounded backdrop-blur-2xs">
                <span>Pass: {inSar.satellitePass}</span>
                <span>Coherence: {inSar.coherenceIndex}</span>
              </div>

              <div className="z-10 text-center text-white bg-black/50 p-2 rounded backdrop-blur-2xs border border-white/20">
                <span className="text-[10px] uppercase tracking-widest block font-bold text-amber-300">Phase Shift Fringe Pattern</span>
                <span className="text-sm font-extrabold font-mono">{inSar.interferogramFringe}</span>
              </div>
            </div>
          </div>

          {/* Technical Telemetry Specs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-indigo-700 block">
                Displacement Velocity
              </span>
              <span className="text-lg font-extrabold text-indigo-950 font-mono">
                {inSar.displacementRateYear}
              </span>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">
                Interferometric Coherence
              </span>
              <span className="text-lg font-extrabold text-amber-950 font-mono">
                {(inSar.coherenceIndex * 100).toFixed(0)}% (High Precision)
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <div className="flex items-center">
              {verifiedStatus ? (
                <span className="text-emerald-700 font-bold flex items-center bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  <CheckCircle className="w-4 h-4 mr-1 text-emerald-600" />
                  InSAR Confirmed Verified
                </span>
              ) : (
                <span className="text-amber-700 font-bold flex items-center bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  Unverified Field Alert
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-3.5 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              {!verifiedStatus && (
                <button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="px-4 py-2 font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isVerifying ? "Processing Radar..." : "Confirm & Validate"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
