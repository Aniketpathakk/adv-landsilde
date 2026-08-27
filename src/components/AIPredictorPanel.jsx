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
    slopeAngleDeg: selectedZone?.id === 'nepal_dam' ? 58 : 48,
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
      slopeAngleDeg: selectedZone?.id === 'nepal_dam' ? 58 : 48,
      historicalMaxProb: 0.94
    });
  };

  return (
    <div className="georisk-card p-5 bg-white text-slate-900 border border-slate-200 mb-6 shadow-xs">
      {/* Panel Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center border border-orange-200 shadow-2xs">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">
                AI/ML Multi-Parametric Landslide Risk Predictor
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200 flex items-center">
                <Sparkles className="w-3 h-3 mr-1 text-orange-500" />
                Random Forest ML (94.8% Acc)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center">
                <Database className="w-3 h-3 mr-1 text-emerald-600" />
                Kaggle Dataset Active ({kaggleSummary.totalRecords.toLocaleString()} Rows)
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Multi-variable AI predictive model trained on <strong>sreeragunandha/landslide-prediction-dataset</strong> ({kaggleSummary.highRiskCount} High-Risk Events).
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="Reset telemetry sliders to zone defaults"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1 text-slate-500" />
            <span>Reset Telemetry</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Interactive Sliders vs Right AI Prediction Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Telemetry Parameter Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs font-extrabold uppercase text-slate-800 flex items-center">
              <Sliders className="w-4 h-4 mr-1.5 text-orange-600" />
              Live Telemetry Input Controls (Simulator)
            </span>
            <span className="text-[11px] font-medium text-slate-600">
              Zone: <strong className="text-orange-700">{selectedZone.name}</strong>
            </span>
          </div>

          {/* Slider 1: 24h Rainfall */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-700">24-Hour Rainfall Intensity:</span>
              <span className="text-slate-900 font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                {params.rain24h} mm/24h
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="350"
              step="5"
              value={params.rain24h}
              onChange={(e) => setParams({ ...params, rain24h: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
          </div>

          {/* Slider 2: Piezometric Pore Water Pressure */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-700">Piezometer Pore Water Pressure:</span>
              <span className="text-slate-900 font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                {params.porePressureKpa} kPa
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="400"
              step="5"
              value={params.porePressureKpa}
              onChange={(e) => setParams({ ...params, porePressureKpa: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
          </div>

          {/* Slider 3: Volumetric Soil Moisture % */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-700">Volumetric Soil Water Content:</span>
              <span className="text-slate-900 font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                {params.volumetricMoisturePct}% VWC
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={params.volumetricMoisturePct}
              onChange={(e) => setParams({ ...params, volumetricMoisturePct: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
          </div>

          {/* Slider 4: InSAR Satellite Displacement Velocity */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-700">InSAR Subsurface Displacement Rate:</span>
              <span className="text-slate-900 font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                {params.displacementMmHr} mm/hr
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              step="0.5"
              value={params.displacementMmHr}
              onChange={(e) => setParams({ ...params, displacementMmHr: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
          </div>

          {/* Slider 5: Slope Inclination Angle */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-700">Terrain Slope Inclination:</span>
              <span className="text-slate-900 font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                {params.slopeAngleDeg}° Slope
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="1"
              value={params.slopeAngleDeg}
              onChange={(e) => setParams({ ...params, slopeAngleDeg: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
          </div>
        </div>

        {/* Right Column: AI Prediction Outputs & Hazard Meter (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Main Risk Output Badge Card */}
          <div className={`p-4 rounded-xl border flex flex-col items-center text-center relative overflow-hidden transition-all ${
            prediction.status === 'CRITICAL_EVACUATION'
              ? 'bg-red-50/90 border-red-200 text-red-950'
              : prediction.status === 'HIGH_WARNING'
                ? 'bg-orange-50/90 border-orange-200 text-orange-950'
                : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
          }`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              AI Predicted Landslide Failure Probability
            </div>

            <div className={`text-4xl font-extrabold font-mono tracking-tight my-0.5 ${
              prediction.status === 'CRITICAL_EVACUATION' ? 'text-red-700' : prediction.status === 'HIGH_WARNING' ? 'text-orange-700' : 'text-emerald-700'
            }`}>
              {prediction.failureProbabilityPct}%
            </div>

            <div className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wide my-1 shadow-2xs ${
              prediction.status === 'CRITICAL_EVACUATION'
                ? 'bg-red-600 text-white'
                : prediction.status === 'HIGH_WARNING'
                  ? 'bg-orange-600 text-white'
                  : 'bg-emerald-600 text-white'
            }`}>
              <Flame className="w-3.5 h-3.5 mr-1 animate-pulse" />
              {prediction.statusLabel}
            </div>

            <div className="flex items-center text-xs font-medium mt-2 text-slate-700 bg-white/90 px-3 py-1.5 rounded-lg border border-slate-200/80 w-full justify-center shadow-2xs">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-orange-600" />
              <span>ETA: <strong>{prediction.estimatedEta}</strong></span>
            </div>
          </div>

          {/* AI Feature Importance Contribution Breakdown */}
          <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-800 border-b border-slate-200 pb-1 flex justify-between">
              <span>AI Feature Weight Contribution</span>
              <span className="text-[10px] text-slate-500 font-mono">Random Forest Weights</span>
            </div>

            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                  <span>Rainfall Patterns (35%)</span>
                  <strong className="font-mono text-slate-900">{prediction.featureImportance.rainfallPct}%</strong>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${prediction.featureImportance.rainfallPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                  <span>Soil Water & Pore Pressure (25%)</span>
                  <strong className="font-mono text-slate-900">{prediction.featureImportance.soilMoisturePct}%</strong>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${prediction.featureImportance.soilMoisturePct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                  <span>InSAR Satellite Displacement (20%)</span>
                  <strong className="font-mono text-slate-900">{prediction.featureImportance.insarRadarPct}%</strong>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${prediction.featureImportance.insarRadarPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                  <span>Slope Inclination & Geometry (12%)</span>
                  <strong className="font-mono text-slate-900">{prediction.featureImportance.slopeTerrainPct}%</strong>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${prediction.featureImportance.slopeTerrainPct}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended AI Mitigation Protocol */}
          <div className="bg-orange-50/60 p-3 rounded-xl border border-orange-200 text-xs">
            <div className="font-bold text-orange-900 mb-1 flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1 text-orange-600" />
              AI Recommended Protocol:
            </div>
            <div className="text-slate-700 leading-relaxed font-medium">
              {prediction.actionRecommendation}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
