import React, { useState, useMemo } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Sliders, 
  AlertOctagon, 
  Clock, 
  ShieldAlert, 
  Activity, 
  Layers, 
  RefreshCw,
  Zap,
  Flame,
  CheckCircle2,
  Database
} from 'lucide-react';
import { predictLandslideRisk } from '../services/aiPredictorEngine';
import kaggleSummary from '../data/kaggleDatasetSummary.json';

export default function AIPredictorPanel({ selectedZone }) {
  // Default interactive telemetry parameters initialized from active zone
  const [params, setParams] = useState({
    rain24h: selectedZone?.kpis?.rain24h || 175,
    antecedentRain10d: selectedZone?.summaryStats?.porePressureKpa ? selectedZone.summaryStats.porePressureKpa * 1.1 : 210,
    porePressureKpa: selectedZone?.summaryStats?.porePressureKpa || 220,
    volumetricMoisturePct: selectedZone?.summaryStats?.volumetricMoisturePct || 82,
    displacementMmHr: selectedZone?.id === 'nepal_dam' ? 30.6 : 8.5,
    slopeAngleDeg: 48,
    historicalMaxProb: selectedZone?.summaryStats?.historicalMaxProb || 0.94
  });

  // Re-sync simulator defaults when user changes zone
  React.useEffect(() => {
    setParams({
      rain24h: selectedZone?.kpis?.rain24h || 175,
      antecedentRain10d: selectedZone?.summaryStats?.porePressureKpa ? selectedZone.summaryStats.porePressureKpa * 1.1 : 210,
      porePressureKpa: selectedZone?.summaryStats?.porePressureKpa || 220,
      volumetricMoisturePct: selectedZone?.summaryStats?.volumetricMoisturePct || 82,
      displacementMmHr: selectedZone?.id === 'nepal_dam' ? 30.6 : 8.5,
      slopeAngleDeg: selectedZone?.id === 'nepal_dam' ? 58 : 48,
      historicalMaxProb: selectedZone?.summaryStats?.historicalMaxProb || 0.94
    });
  }, [selectedZone]);

  // Compute AI Risk Prediction in real time
  const prediction = useMemo(() => predictLandslideRisk(params), [params]);

  const handleReset = () => {
    setParams({
      rain24h: selectedZone?.kpis?.rain24h || 175,
      antecedentRain10d: 210,
      porePressureKpa: selectedZone?.summaryStats?.porePressureKpa || 220,
      volumetricMoisturePct: selectedZone?.summaryStats?.volumetricMoisturePct || 82,
      displacementMmHr: selectedZone?.id === 'nepal_dam' ? 30.6 : 8.5,
      slopeAngleDeg: 48,
      historicalMaxProb: 0.94
    });
  };

  return (
    <div className="georisk-card p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white shadow-xl border border-slate-800 mb-6">
      {/* Panel Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 animate-pulse">
            <BrainCircuit className="w-6 h-6 text-purple-200" />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h2 className="text-base font-extrabold text-white tracking-tight uppercase">
                AI/ML Multi-Parametric Landslide Risk Predictor
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center">
                <Sparkles className="w-3 h-3 mr-1 text-purple-400" />
                Random Forest ML (94.8% Acc)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center">
                <Database className="w-3 h-3 mr-1 text-emerald-400" />
                Kaggle Dataset Active ({kaggleSummary.totalRecords.toLocaleString()} Rows)
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Multi-variable AI predictive model trained on <strong>sreeragunandha/landslide-prediction-dataset</strong> ({kaggleSummary.highRiskCount} High-Risk Events).
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Reset telemetry sliders to zone defaults"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <span>Reset Telemetry</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Interactive Sliders vs Right AI Prediction Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Telemetry Parameter Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-slate-800/50 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
            <span className="text-xs font-extrabold uppercase text-slate-300 flex items-center">
              <Sliders className="w-4 h-4 mr-1.5 text-purple-400" />
              Live Telemetry Input Controls (Simulator)
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Zone: <strong className="text-amber-400">{selectedZone.name}</strong>
            </span>
          </div>

          {/* Slider 1: 24h Rainfall */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">24-Hour Rainfall Intensity:</span>
              <strong className="text-sky-400 font-mono">{params.rain24h} mm/24h</strong>
            </div>
            <input
              type="range"
              min="0"
              max="350"
              step="5"
              value={params.rain24h}
              onChange={(e) => setParams({ ...params, rain24h: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
          </div>

          {/* Slider 2: Piezometric Pore Water Pressure */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Piezometer Pore Water Pressure:</span>
              <strong className="text-orange-400 font-mono">{params.porePressureKpa} kPa</strong>
            </div>
            <input
              type="range"
              min="0"
              max="400"
              step="5"
              value={params.porePressureKpa}
              onChange={(e) => setParams({ ...params, porePressureKpa: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-400"
            />
          </div>

          {/* Slider 3: Volumetric Soil Moisture % */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Volumetric Soil Water Content:</span>
              <strong className="text-emerald-400 font-mono">{params.volumetricMoisturePct}% VWC</strong>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={params.volumetricMoisturePct}
              onChange={(e) => setParams({ ...params, volumetricMoisturePct: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Slider 4: InSAR Satellite Displacement Velocity */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">InSAR Subsurface Displacement Rate:</span>
              <strong className="text-purple-400 font-mono">{params.displacementMmHr} mm/hr</strong>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              step="0.5"
              value={params.displacementMmHr}
              onChange={(e) => setParams({ ...params, displacementMmHr: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
          </div>

          {/* Slider 5: Slope Inclination Angle */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Terrain Slope Inclination:</span>
              <strong className="text-amber-400 font-mono">{params.slopeAngleDeg}° Degree Slope</strong>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="1"
              value={params.slopeAngleDeg}
              onChange={(e) => setParams({ ...params, slopeAngleDeg: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>

        {/* Right Column: AI Prediction Outputs & Hazard Meter (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Main Risk Output Badge Card */}
          <div className={`p-4 rounded-xl border flex flex-col items-center text-center relative overflow-hidden ${
            prediction.status === 'CRITICAL_EVACUATION'
              ? 'bg-red-950/80 border-red-600/80 text-red-200'
              : prediction.status === 'HIGH_WARNING'
                ? 'bg-amber-950/80 border-amber-600/80 text-amber-200'
                : 'bg-emerald-950/80 border-emerald-600/80 text-emerald-200'
          }`}>
            <div className="text-[11px] font-extrabold uppercase tracking-wider mb-1 opacity-80">
              AI Predicted Landslide Failure Probability
            </div>

            <div className="text-5xl font-black font-mono tracking-tight my-1">
              {prediction.failureProbabilityPct}%
            </div>

            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-black/40 border border-white/20 my-1">
              <Flame className="w-3.5 h-3.5 mr-1 animate-pulse" />
              {prediction.statusLabel}
            </div>

            <div className="flex items-center text-xs font-semibold mt-2 text-slate-200 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10 w-full justify-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              <span>ETA: <strong>{prediction.estimatedEta}</strong></span>
            </div>
          </div>

          {/* AI Feature Importance Contribution Breakdown */}
          <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-slate-300 border-b border-slate-700/60 pb-1 flex justify-between">
              <span>AI Feature Weight Contribution</span>
              <span className="text-[10px] text-purple-400 font-mono">Random Forest Weights</span>
            </div>

            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Rainfall Patterns (35%)</span>
                  <strong className="font-mono text-sky-400">{prediction.featureImportance.rainfallPct}%</strong>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full" style={{ width: `${prediction.featureImportance.rainfallPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Soil Water & Pore Pressure (25%)</span>
                  <strong className="font-mono text-orange-400">{prediction.featureImportance.soilMoisturePct}%</strong>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full" style={{ width: `${prediction.featureImportance.soilMoisturePct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>InSAR Satellite Displacement (20%)</span>
                  <strong className="font-mono text-purple-400">{prediction.featureImportance.insarRadarPct}%</strong>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${prediction.featureImportance.insarRadarPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Slope Inclination & Geometry (12%)</span>
                  <strong className="font-mono text-amber-400">{prediction.featureImportance.slopeTerrainPct}%</strong>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${prediction.featureImportance.slopeTerrainPct}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended AI Mitigation Protocol */}
          <div className="bg-purple-950/30 p-3 rounded-xl border border-purple-500/30 text-xs">
            <div className="font-bold text-purple-300 mb-1 flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1 text-purple-400" />
              AI Recommended Protocol:
            </div>
            <div className="text-slate-300 leading-relaxed font-medium">
              {prediction.actionRecommendation}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
