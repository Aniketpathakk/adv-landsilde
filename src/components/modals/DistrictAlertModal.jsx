import React, { useState } from 'react';
import { X, Send, ShieldAlert, CheckCircle, FileText, Building2 } from 'lucide-react';

export default function DistrictAlertModal({ report, selectedZone, onClose }) {
  if (!report) return null;

  const [isAlerting, setIsAlerting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const officialDraft = `URGENT GEOTECHNICAL DISASTER NOTICE
TO: District Magistrate & Collector, ${selectedZone.district} (${selectedZone.state})
FROM: GeoRisk Sentinel Automated Early Warning Engine

REF INCIDENT: ${report.id}
LOCATION: ${report.location}
GPS COORDINATES: Lat ${report.lat}, Lng ${report.lng}
CATEGORY: ${report.category} (Crack Width: ${report.crackWidthCm} cm)

TELEMETRY RISK SUMMARY:
Slope stability threshold exceeded (>0.75 failure index). Subsurface piezometric pore pressure rapidly mounting due to antecedent rainfall accumulation.

RECOMMENDED ACTION:
1. Issue Section 144 / Traffic diversion along affected corridor.
2. Mobilize Block Development Officer (BDO) & Executive Engineer PWD.
3. Pre-position SDRF search & rescue team.`;

  const handleSendAlert = () => {
    setIsAlerting(true);
    setTimeout(() => {
      setIsAlerting(false);
      setIsSent(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-amber-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-amber-200" />
            <h2 className="text-base font-bold tracking-tight">
              Official Alert Dispatch: District Collector / DM
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-amber-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {!isSent ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Recipient Authority
                </label>
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg font-bold text-amber-950 flex items-center justify-between">
                  <span>District Collector & Magistrate, {selectedZone.district}</span>
                  <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded text-amber-900">Priority 1</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Official Disaster Notice Draft
                </label>
                <textarea
                  readOnly
                  value={officialDraft}
                  className="w-full h-44 p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendAlert}
                  disabled={isAlerting}
                  className="flex items-center px-4 py-2 font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isAlerting ? (
                    "Transmitting Notice..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-1.5" />
                      <span>Transmit Official Notice</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Official Alert Notice Dispatched!
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Encrypted dispatch delivered to Office of the District Collector, {selectedZone.district} & State Disaster Management Control Room.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2 font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
