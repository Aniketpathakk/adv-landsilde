import React, { useState } from 'react';
import { Truck, Navigation, AlertTriangle, Clock, ArrowRight, ShieldCheck, CornerUpRight } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function RoadVulnerabilities({ highways, selectedZone, lang, onFocusHighway }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [selectedRoad, setSelectedRoad] = useState(highways[0] || null);

  return (
    <div className="georisk-card p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2.5">
        <div className="flex items-center space-x-2">
          <Truck className="w-5 h-5 text-orange-600" />
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            {t.vulnerability.title}
          </h2>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
          BRO & PWD Alert
        </span>
      </div>

      {/* Horizontal Bar Chart & Ranking List */}
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-1">
        {highways.map((road) => {
          const isSelected = selectedRoad?.id === road.id;
          const riskPct = (road.riskScore * 100).toFixed(0);

          return (
            <div
              key={road.id}
              onClick={() => {
                setSelectedRoad(road);
                if (onFocusHighway) onFocusHighway(road);
              }}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-orange-50/80 border-orange-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-orange-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-900 flex items-center truncate max-w-[200px]">
                  <Navigation className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                  {road.name}
                </span>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    road.status === 'Blocked'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : road.status.includes('One-Lane')
                        ? 'bg-orange-100 text-orange-800 border border-orange-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {road.status}
                  </span>
                  <span className="font-mono font-extrabold text-slate-900">
                    {riskPct}% Risk
                  </span>
                </div>
              </div>

              {/* Progress Bar (Horizontal Bar Chart) */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-1.5">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    road.riskScore >= 0.9
                      ? 'bg-red-600'
                      : road.riskScore >= 0.7
                        ? 'bg-orange-500'
                        : 'bg-amber-400'
                  }`}
                  style={{ width: `${riskPct}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Displacement: <strong className="text-slate-800">{road.displacementRate}</strong></span>
                <span>Length: <strong className="text-slate-800">{road.lengthKm} km</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Footer Card for Selected Highway */}
      {selectedRoad && (
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
          <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
            <span className="flex items-center text-slate-800">
              <CornerUpRight className="w-3.5 h-3.5 text-orange-600 mr-1" />
              Detour & Traffic Impact:
            </span>
            <span className="text-[10px] text-slate-500 flex items-center font-mono">
              <Clock className="w-3 h-3 mr-1 text-slate-400" />
              Clearance ETA: {selectedRoad.clearedEta}
            </span>
          </div>
          <p className="text-slate-600 text-[11px] leading-snug">
            <strong>Alt Route:</strong> {selectedRoad.detourName}
          </p>
          <p className="text-slate-600 text-[11px] leading-snug mt-0.5">
            <strong>Impact:</strong> {selectedRoad.trafficImpact}
          </p>
        </div>
      )}
    </div>
  );
}
