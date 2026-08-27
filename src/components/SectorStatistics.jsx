import React, { useState } from 'react';
import { 
  Table, 
  MapPin, 
  Activity, 
  ShieldAlert, 
  Search, 
  ChevronRight, 
  Gauge, 
  Droplets,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function SectorStatistics({
  selectedZone,
  slopeSectors,
  focusedSector,
  setFocusedSector,
  lang
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [searchTerm, setSearchTerm] = useState('');

  // Filter sectors by zone or search term
  const filteredSectors = slopeSectors.filter(s => {
    const matchesZone = s.zoneId === selectedZone.id;
    const matchesSearch = s.refName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesZone && matchesSearch;
  });

  const summary = selectedZone.summaryStats;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Top Table Card: Excavations / Slope Sector Statistics */}
      <div className="georisk-card p-4 flex-1 flex flex-col min-h-[300px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <Table className="w-4 h-4 text-orange-600" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              {t.sector.title}
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search sector ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 w-44"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto overflow-y-auto max-h-[220px] rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-2.5">{t.sector.refName}</th>
                <th className="p-2.5">{t.sector.meanRisk}</th>
                <th className="p-2.5">{t.sector.minRisk}</th>
                <th className="p-2.5">{t.sector.maxRisk}</th>
                <th className="p-2.5">{t.sector.stdDev}</th>
                <th className="p-2.5">{t.sector.status}</th>
                <th className="p-2.5 text-right">{t.sector.focus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredSectors.length > 0 ? (
                filteredSectors.map((sector) => {
                  const isSelected = focusedSector?.refName === sector.refName;
                  return (
                    <tr
                      key={sector.refName}
                      onClick={() => setFocusedSector(sector)}
                      className={`hover:bg-orange-50/60 transition-colors cursor-pointer ${
                        isSelected ? 'bg-orange-100/70 border-l-4 border-l-orange-600' : ''
                      }`}
                    >
                      <td className="p-2.5 font-bold text-slate-900">
                        {sector.refName}
                        <div className="text-[10px] font-normal text-slate-500 truncate max-w-[120px]">
                          {sector.location}
                        </div>
                      </td>
                      <td className="p-2.5 font-semibold text-slate-900">
                        {sector.meanRisk.toFixed(2)}
                      </td>
                      <td className="p-2.5 text-slate-500">{sector.minRisk.toFixed(2)}</td>
                      <td className="p-2.5 text-slate-900 font-semibold">{sector.maxRisk.toFixed(2)}</td>
                      <td className="p-2.5 text-slate-400 font-mono">{sector.stdDev.toFixed(2)}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          sector.status === 'critical'
                            ? 'badge-critical'
                            : sector.status === 'warning'
                              ? 'badge-warning'
                              : sector.status === 'watch'
                                ? 'badge-watch'
                                : 'badge-safe'
                        }`}>
                          {sector.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-right">
                        <button className="text-orange-600 hover:text-orange-800 p-1 rounded hover:bg-orange-100 transition-colors">
                          <MapPin className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-slate-400 text-xs">
                    No sector data found matching search criteria for {selectedZone.name}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Summary Card: Dynamic Slope Stability Summary */}
      <div className="georisk-card p-4 bg-gradient-to-br from-white to-slate-50/80">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {t.sector.stabilitySummary}
            </h3>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
            Telemetry Stream Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Weekly Risk Level */}
          <div className="p-2.5 rounded-lg bg-white border border-slate-200">
            <span className="text-[11px] text-slate-500 block font-medium">
              {t.sector.weeklyLevel}
            </span>
            <span className="text-sm font-extrabold text-orange-600 mt-0.5 block">
              {summary.weeklyRiskLevel}
            </span>
          </div>

          {/* Peak Weekly Probability */}
          <div className="p-2.5 rounded-lg bg-white border border-slate-200">
            <span className="text-[11px] text-slate-500 block font-medium">
              {t.sector.peakProb}
            </span>
            <div className="flex items-baseline space-x-1 mt-0.5">
              <span className="text-sm font-extrabold text-slate-900">
                {summary.peakWeeklyProb}
              </span>
              <span className="text-[10px] text-slate-400">
                ({summary.peakWeeklyDate})
              </span>
            </div>
          </div>

          {/* Historical Max Probability */}
          <div className="p-2.5 rounded-lg bg-white border border-slate-200 col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                {t.sector.historicalMax}
              </span>
              <span className="text-xs font-bold text-slate-900">
                {summary.historicalMaxProb}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Event Ref: {summary.historicalMaxDate}
            </p>
          </div>
        </div>

        {/* Soil Saturation & Pore Pressure Dynamic Gauge Bar */}
        <div className="mt-3 pt-3 border-t border-slate-200/80">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-slate-700 flex items-center">
              <Droplets className="w-3.5 h-3.5 text-sky-600 mr-1" />
              Piezometric Pressure & Saturation:
            </span>
            <span className="font-mono font-bold text-orange-600">
              {summary.porePressureKpa} kPa ({summary.volumetricMoisturePct}%)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-amber-400 to-red-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (summary.porePressureKpa / 300) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>0 kPa (Dry)</span>
            <span>150 kPa (Watch)</span>
            <span>300 kPa (Sat. Failure)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
