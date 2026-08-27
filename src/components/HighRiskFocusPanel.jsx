import React from 'react';
import { 
  Flame, 
  AlertOctagon, 
  MapPin, 
  Users, 
  Activity, 
  Radio, 
  ShieldAlert, 
  ArrowRight,
  Target
} from 'lucide-react';
import { HIGH_RISK_PRIORITY_ZONES, TRANSLATIONS } from '../data/mockData';

export default function HighRiskFocusPanel({
  selectedZone,
  onFocusHighRiskZone,
  onOpenSmsModal,
  activeHighRiskId
}) {
  return (
    <div className="georisk-card p-4 bg-gradient-to-r from-red-50/80 via-orange-50/50 to-white border-l-4 border-l-red-600 mb-6">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-200/60 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-sm animate-pulse">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                High Risk Disaster Priority Radar
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-600 text-white shadow-2xs">
                Top Disaster Possibility Zones
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Geotechnical early warning models indicate imminent slope failure risk exceeding safety thresholds.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-md border border-red-200">
            {HIGH_RISK_PRIORITY_ZONES.length} Sectors Under Critical Watch
          </span>
        </div>
      </div>

      {/* Grid of Ranked High-Risk Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {HIGH_RISK_PRIORITY_ZONES.map((hrZone) => {
          const isActive = activeHighRiskId === hrZone.id;
          const scorePct = (hrZone.disasterPossibilityScore * 100).toFixed(0);

          return (
            <div
              key={hrZone.id}
              className={`p-3 rounded-lg border transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-red-600 shadow-md ring-2 ring-red-500/20'
                  : 'bg-white/90 border-slate-200 hover:border-red-300 hover:shadow-xs'
              }`}
            >
              {/* Card Top: Name & Disaster Possibility Badge */}
              <div>
                <div className="flex items-start justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-red-700 uppercase bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                    {hrZone.id}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-red-600 bg-red-100 px-2 py-0.5 rounded-full flex items-center">
                    <Target className="w-3 h-3 mr-1 animate-ping text-red-600" />
                    {scorePct}% Possibility
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 leading-tight mb-1">
                  {hrZone.name}
                </h3>

                <p className="text-[11px] text-slate-500 font-medium mb-2">
                  Hazard: <strong className="text-slate-800">{hrZone.primaryHazard}</strong>
                </p>
              </div>

              {/* Card Middle: Key Specs */}
              <div className="bg-slate-50 p-2 rounded border border-slate-100 text-[11px] space-y-1 mb-3">
                <div className="flex justify-between text-slate-700">
                  <span>Pop. at Risk:</span>
                  <strong className="text-slate-900 font-mono">{hrZone.populationAtRisk.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Displacement Velocity:</span>
                  <strong className="text-red-700 font-mono">{hrZone.displacementRate}</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Pore Pressure:</span>
                  <strong className="text-orange-700 font-mono">{hrZone.porePressureKpa} kPa</strong>
                </div>
              </div>

              {/* Card Bottom: Action Buttons */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
                <button
                  onClick={() => onFocusHighRiskZone(hrZone)}
                  className={`flex-1 py-1.5 px-2 rounded text-[11px] font-bold flex items-center justify-center transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-red-700 border border-slate-200'
                  }`}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{isActive ? 'Focused on Map' : 'Focus Map'}</span>
                </button>

                <button
                  onClick={onOpenSmsModal}
                  className="py-1.5 px-2.5 rounded text-[11px] font-bold bg-red-100 hover:bg-red-200 text-red-900 border border-red-200 flex items-center justify-center transition-colors cursor-pointer"
                  title="Issue Evacuation SMS Broadcast for this zone"
                >
                  <Radio className="w-3 h-3 text-red-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
