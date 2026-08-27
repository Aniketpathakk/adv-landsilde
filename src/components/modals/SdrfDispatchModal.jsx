import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle, Truck, MapPin, Users } from 'lucide-react';

export default function SdrfDispatchModal({ report, selectedZone, onClose }) {
  if (!report) return null;

  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [teamName, setTeamName] = useState('SDRF 2nd Battalion (Alpha Team)');
  const [vehicleCount, setVehicleCount] = useState(3);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-red-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-red-200" />
            <h2 className="text-base font-bold tracking-tight">
              State Disaster Response Force (SDRF) Deployment
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-red-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {!isDeployed ? (
            <>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-red-700 block">Incident Target</span>
                <span className="text-sm font-bold text-red-950">{report.category}</span>
                <span className="text-[11px] text-red-800 block mt-0.5">{report.location}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assign Rescue Battalion
                </label>
                <select
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option>SDRF 2nd Battalion (Alpha Team - Gangtok HQ)</option>
                  <option>SDRF 4th Battalion (Bravo Team - Shillong Ridge)</option>
                  <option>NDRF 12th Battalion (Pre-positioned Taskforce)</option>
                  <option>BRO Heavy Equipment & Rescue Squad</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-medium block">Rescue Personnel</span>
                  <strong className="text-base font-bold text-slate-900">18 Rescuers</strong>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-medium block">Earthmovers & Ambulances</span>
                  <strong className="text-base font-bold text-slate-900">{vehicleCount} Units</strong>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  className="flex items-center px-4 py-2 font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isDeploying ? (
                    "Deploying Squad..."
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 mr-1.5" />
                      <span>Order SDRF Immediate Deployment</span>
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
                SDRF Battalion Deployed!
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                {teamName} is en route to <strong>{report.location}</strong> with GPS telemetry tracking active.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2 font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
