import React from 'react';
import { 
  AlertTriangle, 
  Truck, 
  CloudRain, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function ExecutiveKPIs({ selectedZone, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const kpis = selectedZone.kpis;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* KPI Card 1: Critical Landslide Risk Zones */}
      <div className="georisk-card p-4 relative overflow-hidden group border-l-4 border-l-red-500">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {t.kpi.criticalZones}
          </span>
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-extrabold text-slate-900">
            {kpis.criticalZonesPct}%
          </span>
          <span className="text-xs font-semibold text-slate-500">
            ({kpis.criticalZonesCount})
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center text-red-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>{kpis.criticalZonesTrend}</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-red-100/80 text-red-800 font-semibold">
            Threshold Exceeded
          </span>
        </div>
      </div>

      {/* KPI Card 2: Road Corridor Status */}
      <div className="georisk-card p-4 relative overflow-hidden group border-l-4 border-l-amber-500">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {t.kpi.roadStatus}
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Truck className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-extrabold text-slate-900">
            {kpis.roadBlockedPct}% Blocked
          </span>
          <span className="text-xs font-semibold text-slate-500">
            ({kpis.roadBlockedKm} / {kpis.roadMonitoredKm} km)
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium flex items-center">
            <Navigation className="w-3.5 h-3.5 mr-1 text-amber-600" />
            NH-10 & NH-29 Watch
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
            Detours Active
          </span>
        </div>
      </div>

      {/* KPI Card 3: IMD Extreme Weather Alerts */}
      <div className="georisk-card p-4 relative overflow-hidden group border-l-4 border-l-sky-500">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.kpi.weatherAlert}
            </span>
            <span className="bg-sky-100 text-sky-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-sky-200 uppercase tracking-tighter">
              IMD API LIVE
            </span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <CloudRain className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-extrabold text-slate-900">
            {kpis.rain24h} mm
          </span>
          <span className="text-xs font-semibold text-slate-500">
            / 24 hrs
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-600 truncate max-w-[140px] font-medium" title={kpis.rainStatus}>
            {kpis.rainStatus}
          </span>
          <span className={`text-[11px] px-2 py-0.5 rounded font-bold uppercase ${
            kpis.rainAlertLevel === 'red' 
              ? 'bg-red-100 text-red-800' 
              : kpis.rainAlertLevel === 'amber' 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-yellow-100 text-yellow-800'
          }`}>
            {kpis.rainAlertLevel} alert
          </span>
        </div>
      </div>

      {/* KPI Card 4: Response Dispatch Rate */}
      <div className="georisk-card p-4 relative overflow-hidden group border-l-4 border-l-emerald-500">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {t.kpi.responseRate}
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-extrabold text-slate-900">
            {kpis.dispatchPct}%
          </span>
          <span className="text-xs font-semibold text-slate-500">
            ({kpis.dispatchCount} tasks)
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            SDRF Deployed: <strong className="ml-1 text-slate-800">{kpis.sdrfTeamsDeployed} Teams</strong>
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
            On Standby
          </span>
        </div>
      </div>
    </div>
  );
}
