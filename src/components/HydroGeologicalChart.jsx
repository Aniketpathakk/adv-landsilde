import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ReferenceLine,
  CartesianGrid 
} from 'recharts';
import { Activity, CloudRain, Calendar, ShieldAlert, AlertTriangle, Database, TrendingUp, History } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';
import historicalRainfallData from '../data/historicalRainfall1901_2024.json';

export default function HydroGeologicalChart({ timeSeriesData, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [timeRange, setTimeRange] = useState('15d');
  const [historicalEra, setHistoricalEra] = useState('recent'); // 'all', '1901-1960', '1961-2000', 'recent'

  // Filter historical rainfall data based on selected era
  const filteredHistoricalData = useMemo(() => {
    if (historicalEra === '1901-1960') {
      return historicalRainfallData.filter(d => d.year <= 1960);
    } else if (historicalEra === '1961-2000') {
      return historicalRainfallData.filter(d => d.year > 1960 && d.year <= 2000);
    } else if (historicalEra === 'recent') {
      return historicalRainfallData.filter(d => d.year >= 1990);
    }
    return historicalRainfallData;
  }, [historicalEra]);

  // Custom Tooltip for Real-Time 15d/30d Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-xs border border-slate-200 p-3 rounded-lg shadow-xl text-xs font-sans max-w-xs z-50">
          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 mb-2 flex items-center justify-between">
            <span>{label}</span>
            {data.event && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold">
                Event Marker
              </span>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block mr-1.5"></span>
                Risk Probability:
              </span>
              <strong className="text-orange-600 font-mono">{(data.riskMean * 100).toFixed(1)}%</strong>
            </div>

            <div className="flex items-center justify-between text-slate-500 text-[11px] pl-4">
              <span>Confidence Range:</span>
              <span className="font-mono">
                {(data.riskLower * 100).toFixed(0)}% &mdash; {(data.riskUpper * 100).toFixed(0)}%
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-700 pt-1 border-t border-slate-100">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block mr-1.5"></span>
                10-Day Accum. Rain:
              </span>
              <strong className="text-sky-600 font-mono">{data.rain_10_acc} mm</strong>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block mr-1.5"></span>
                15-Day Peak Intensity:
              </span>
              <strong className="text-indigo-600 font-mono">{data.rain_15_max} mm/h</strong>
            </div>

            {data.event && (
              <div className="mt-2 p-1.5 bg-red-50 text-red-800 rounded border border-red-200 text-[11px] font-semibold flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 shrink-0 text-red-600" />
                {data.event}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for 124-Year Historical Climate Analysis
  const HistoricalTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-xs border border-slate-200 p-3.5 rounded-xl shadow-xl text-xs font-sans max-w-xs z-50">
          <div className="font-extrabold text-slate-900 border-b border-slate-200 pb-1.5 mb-2 flex items-center justify-between">
            <span className="text-sm font-mono text-orange-600">Year {d.year}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold border border-slate-200">
              Annual: {d.annual} mm
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-sky-500 mr-1.5"></span>
                Monsoon (Jun–Sep):
              </span>
              <strong className="font-mono text-sky-700">{d.monsoon} mm</strong>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
                Pre-Monsoon (Mar–May):
              </span>
              <strong className="font-mono text-amber-700">{d.preMonsoon} mm</strong>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-indigo-500 mr-1.5"></span>
                Post-Monsoon (Oct–Dec):
              </span>
              <strong className="font-mono text-indigo-700">{d.postMonsoon} mm</strong>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-teal-500 mr-1.5"></span>
                Winter (Jan–Feb):
              </span>
              <strong className="font-mono text-teal-700">{d.winter} mm</strong>
            </div>

            {d.annual > 2400 && (
              <div className="mt-2 p-1.5 bg-red-50 text-red-800 rounded-lg border border-red-200 text-[10px] font-bold flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 shrink-0 text-red-600" />
                Extreme Precipitation Outlier Trigger ({d.annual} mm)
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const isHistorical = timeRange === '124yr';

  return (
    <div className="georisk-card p-5 mb-6 bg-white text-slate-900 border border-slate-200">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-orange-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center">
              {isHistorical ? (
                <>124-Year Climate Rainfall Baseline & Monsoonal Trend (1901 – 2024)</>
              ) : (
                <>{t.chart.title}</>
              )}
            </h2>
            {isHistorical && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center">
                <Database className="w-3 h-3 mr-1" />
                124 Records Verified
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isHistorical 
              ? "Long-term historical climate benchmark for return-period landslide trigger threshold modeling."
              : t.chart.subtitle}
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {isHistorical && (
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              {[
                { id: 'recent', label: '1990–2024' },
                { id: '1961-2000', label: '1961–2000' },
                { id: '1901-1960', label: '1901–1960' },
                { id: 'all', label: 'All 124 Yrs' }
              ].map((era) => (
                <button
                  key={era.id}
                  onClick={() => setHistoricalEra(era.id)}
                  className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer text-[11px] ${
                    historicalEra === era.id
                      ? 'bg-white text-orange-700 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {era.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            {[
              { id: '7d', label: '7d' },
              { id: '15d', label: '15d' },
              { id: '30d', label: '30d' },
              { id: '124yr', label: '124-Yr (1901-2024)' }
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  timeRange === range.id
                    ? 'bg-white text-orange-600 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Legend Summary */}
      {isHistorical ? (
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded bg-sky-500 mr-1.5"></span>
              Monsoon Season (Jun–Sep)
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded bg-amber-500 mr-1.5"></span>
              Pre-Monsoon (Mar–May)
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded bg-orange-600 mr-1.5"></span>
              Total Annual Rainfall (mm)
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-600">
            <span>Historical Normal: <strong className="text-slate-900 font-mono">2,091 mm/yr</strong></span>
            <span>&bull;</span>
            <span>All-time Record: <strong className="text-red-700 font-mono">1948 (2,792.3 mm)</strong></span>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded bg-orange-500/80 mr-1.5"></span>
              {t.chart.probEnvelope}
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded bg-sky-400/50 mr-1.5"></span>
              {t.chart.rain10Acc}
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded bg-indigo-600 mr-1.5"></span>
              {t.chart.rain15Max}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <span className="text-amber-700 font-bold flex items-center">
              <span className="w-4 h-0.5 bg-amber-500 inline-block mr-1"></span>
              Warning (0.40)
            </span>
            <span className="text-orange-700 font-bold flex items-center">
              <span className="w-4 h-0.5 bg-orange-500 inline-block mr-1"></span>
              Critical (0.70)
            </span>
            <span className="text-red-700 font-bold flex items-center">
              <span className="w-4 h-0.5 bg-red-600 inline-block mr-1"></span>
              Evacuate (0.90)
            </span>
          </div>
        </div>
      )}

      {/* Recharts Container */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          {isHistorical ? (
            <ComposedChart data={filteredHistoricalData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 11, fill: '#64748B' }} 
                tickLine={false} 
                axisLine={{ stroke: '#E2E8F0' }}
              />
              
              {/* Left Y Axis for Monsoon / Seasonal mm */}
              <YAxis 
                yAxisId="left" 
                domain={[0, 2400]} 
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(v) => `${v} mm`}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />

              {/* Right Y Axis for Annual Total mm */}
              <YAxis 
                yAxisId="right" 
                orientation="right"
                domain={[1000, 3200]}
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(v) => `${v} mm`}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />

              <Tooltip content={<HistoricalTooltip />} />

              {/* 100-Year Climate Mean Reference Line */}
              <ReferenceLine yAxisId="right" y={2091} stroke="#94A3B8" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "124-Yr Normal (2091 mm)", fill: "#64748B", fontSize: 10, position: "top" }} />

              {/* High Anomaly Extreme Hazard Threshold */}
              <ReferenceLine yAxisId="right" y={2500} stroke="#EF4444" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "Critical Trigger Threshold (2500 mm)", fill: "#DC2626", fontSize: 10, position: "top" }} />

              {/* Monsoon Season Stacked Bar */}
              <Bar
                yAxisId="left"
                dataKey="monsoon"
                fill="#0EA5E9"
                barSize={historicalEra === 'all' ? 4 : 10}
                radius={[3, 3, 0, 0]}
                opacity={0.85}
                name="Monsoon (Jun-Sep)"
              />

              {/* Pre-Monsoon Bar */}
              <Bar
                yAxisId="left"
                dataKey="preMonsoon"
                fill="#F59E0B"
                barSize={historicalEra === 'all' ? 4 : 10}
                radius={[3, 3, 0, 0]}
                opacity={0.7}
                name="Pre-Monsoon (Mar-May)"
              />

              {/* Annual Rainfall Spline Line */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="annual"
                stroke="#EA580C"
                strokeWidth={2.5}
                dot={historicalEra === 'all' ? false : { r: 3, fill: '#EA580C', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: '#EF4444', stroke: '#FFFFFF', strokeWidth: 2 }}
                name="Annual Total"
              />
            </ComposedChart>
          ) : (
            <ComposedChart data={timeSeriesData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#64748B' }} 
                tickLine={false} 
                axisLine={{ stroke: '#E2E8F0' }}
              />
              
              {/* Left Y Axis for Risk Probability (0.0 to 1.0) */}
              <YAxis 
                yAxisId="left" 
                domain={[0, 1.0]} 
                ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />

              {/* Right Y Axis for Rainfall mm */}
              <YAxis 
                yAxisId="right" 
                orientation="right"
                domain={[0, 300]}
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(v) => `${v} mm`}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Reference Safety Threshold Lines */}
              <ReferenceLine yAxisId="left" y={0.40} stroke="#FBBF24" strokeDasharray="4 4" strokeWidth={1.5} />
              <ReferenceLine yAxisId="left" y={0.70} stroke="#F97316" strokeDasharray="4 4" strokeWidth={1.5} />
              <ReferenceLine yAxisId="left" y={0.90} stroke="#EF4444" strokeDasharray="4 4" strokeWidth={2} />

              {/* Rainfall Accumulation Area */}
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="rain_10_acc"
                fill="#38BDF8"
                stroke="#0284C7"
                fillOpacity={0.18}
                strokeWidth={1.5}
                name="10-Day Rain (mm)"
              />

              {/* Rainfall Peak Bar */}
              <Bar
                yAxisId="right"
                dataKey="rain_15_max"
                fill="#4F46E5"
                barSize={10}
                radius={[4, 4, 0, 0]}
                opacity={0.7}
                name="15-Day Peak Intensity"
              />

              {/* Confidence Envelope Shading Upper/Lower */}
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="riskUpper"
                stroke="none"
                fill="#F97316"
                fillOpacity={0.12}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="riskLower"
                stroke="none"
                fill="#FFFFFF"
                fillOpacity={1.0}
              />

              {/* Risk Probability Spline Line */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="riskMean"
                stroke="#EA580C"
                strokeWidth={3}
                dot={{ r: 4, fill: '#EA580C', stroke: '#FFFFFF', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: '#EF4444', stroke: '#FFFFFF', strokeWidth: 2 }}
                name="Landslide Risk Index"
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

