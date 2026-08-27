import React, { useState } from 'react';
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
import { Activity, CloudRain, Calendar, ShieldAlert, AlertTriangle } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function HydroGeologicalChart({ timeSeriesData, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [timeRange, setTimeRange] = useState('15d');

  // Custom Tooltip for Recharts
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

  return (
    <div className="georisk-card p-5 mb-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-orange-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {t.chart.title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.chart.subtitle}
          </p>
        </div>

        {/* Range Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          {['7d', '15d', '30d', 'Monsoon'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                timeRange === range
                  ? 'bg-white text-orange-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Legend Summary */}
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

      {/* Recharts Container */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
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
        </ResponsiveContainer>
      </div>
    </div>
  );
}
