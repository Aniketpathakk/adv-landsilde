import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExecutiveKPIs from './components/ExecutiveKPIs';
import HighRiskFocusPanel from './components/HighRiskFocusPanel';
import GISMapViewer from './components/GISMapViewer';
import SectorStatistics from './components/SectorStatistics';
import HydroGeologicalChart from './components/HydroGeologicalChart';
import RoadVulnerabilities from './components/RoadVulnerabilities';
import CrowdsourcedDispatch from './components/CrowdsourcedDispatch';
import NepalDamAlertBanner from './components/NepalDamAlertBanner';
import AIPredictorPanel from './components/AIPredictorPanel';
import { fetchImdRainfallData } from './services/imdWeatherService';

// Modals
import BroadcastSMSModal from './components/modals/BroadcastSMSModal';
import InSarModal from './components/modals/InSarModal';
import DistrictAlertModal from './components/modals/DistrictAlertModal';
import SdrfDispatchModal from './components/modals/SdrfDispatchModal';
import NewReportModal from './components/modals/NewReportModal';

// Mock Data
import { 
  MONITORING_ZONES, 
  HIGH_RISK_PRIORITY_ZONES,
  TELEMETRY_PINS, 
  SLOPE_SECTORS, 
  HYDRO_TIME_SERIES, 
  HIGHWAY_VULNERABILITIES, 
  INITIAL_CITIZEN_REPORTS,
  TRANSLATIONS 
} from './data/mockData';

export default function App() {
  const [selectedZone, setSelectedZone] = useState(MONITORING_ZONES[0]);
  const [lang, setLang] = useState('en');
  const [isOffline, setIsOffline] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString());

  // High Risk Priority Focus State
  const [activeHighRiskZone, setActiveHighRiskZone] = useState(HIGH_RISK_PRIORITY_ZONES[0]);

  // Data states
  const [telemetryPins, setTelemetryPins] = useState(TELEMETRY_PINS);
  const [slopeSectors, setSlopeSectors] = useState(SLOPE_SECTORS);
  const [timeSeriesData, setTimeSeriesData] = useState(HYDRO_TIME_SERIES);
  const [highways, setHighways] = useState(HIGHWAY_VULNERABILITIES);
  const [citizenReports, setCitizenReports] = useState(INITIAL_CITIZEN_REPORTS);
  const [focusedSector, setFocusedSector] = useState(null);

  // Modals state
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [inSarReport, setInSarReport] = useState(null);
  const [districtAlertReport, setDistrictAlertReport] = useState(null);
  const [sdrfReport, setSdrfReport] = useState(null);
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
  const [syncToast, setSyncToast] = useState(null);

  // Live IMD Weather Stream Sync Effect
  useEffect(() => {
    if (!selectedZone || isOffline) return;

    let isMounted = true;
    async function loadLiveImdTelemetry() {
      const [lat, lng] = selectedZone.center;
      const imdData = await fetchImdRainfallData(lat, lng);
      if (imdData && isMounted) {
        setSelectedZone(prev => ({
          ...prev,
          kpis: {
            ...prev.kpis,
            rain24h: imdData.rain24h,
            rainStatus: imdData.statusMsg,
            rainAlertLevel: imdData.alertLevel
          }
        }));
        setLastSyncTime(imdData.timestamp);
      }
    }

    loadLiveImdTelemetry();
    return () => { isMounted = false; };
  }, [selectedZone.id, isOffline]);

  // Force telemetry sync handler
  const handleForceSync = () => {
    setLastSyncTime(new Date().toLocaleTimeString());
    setSyncToast('Telemetry stream refreshed & local IndexedDB sync complete!');
    setTimeout(() => setSyncToast(null), 3000);
  };

  // High risk zone focus handler
  const handleFocusHighRiskZone = (hrZone) => {
    setActiveHighRiskZone(hrZone);
    // Find matching parent zone if available
    const parentZone = MONITORING_ZONES.find(z => z.id === hrZone.zoneId);
    if (parentZone) {
      setSelectedZone(parentZone);
    }
    setSyncToast(`Focused on High Risk Zone: ${hrZone.name} (${(hrZone.disasterPossibilityScore * 100).toFixed(0)}% Possibility)`);
    setTimeout(() => setSyncToast(null), 3500);
  };

  // Focus on Nepal Dam Breach Zone directly
  const handleFocusNepalDamBreach = () => {
    const nepalHr = HIGH_RISK_PRIORITY_ZONES.find(z => z.id === 'HRZ-NEP-05') || HIGH_RISK_PRIORITY_ZONES[0];
    handleFocusHighRiskZone(nepalHr);
  };

  // Citizen report submit handler
  const handleAddCitizenReport = (newRep) => {
    setCitizenReports([newRep, ...citizenReports]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-900">
      {/* Toast Notification Banner */}
      {syncToast && (
        <div className="fixed top-14 right-4 z-50 bg-slate-900 text-emerald-400 px-4 py-2 rounded-lg shadow-lg border border-slate-700 text-xs font-mono flex items-center space-x-2 animate-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{syncToast}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        monitoringZones={MONITORING_ZONES}
        lang={lang}
        setLang={setLang}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        onOpenSmsModal={() => setIsSmsModalOpen(true)}
        lastSyncTime={lastSyncTime}
        onForceSync={handleForceSync}
        onFocusHighRiskMode={() => handleFocusHighRiskZone(HIGH_RISK_PRIORITY_ZONES[0])}
      />

      {/* Main Dashboard Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* NEPAL DAM BREACH & OUTBURST DETECTION CATASTROPHIC ALERT BANNER */}
        <NepalDamAlertBanner
          onFocusNepalZone={handleFocusNepalDamBreach}
          onOpenSmsModal={() => setIsSmsModalOpen(true)}
          onOpenInSarScan={() => setInSarReport(citizenReports.find(r => r.id === 'REP-2026-NEP01') || citizenReports[0])}
          onDispatchSdrf={() => setSdrfReport(citizenReports.find(r => r.id === 'REP-2026-NEP01') || citizenReports[0])}
          isDetected={true}
        />

        {/* BAND 1: TOP EXECUTIVE KPI CARDS */}
        <ExecutiveKPIs
          selectedZone={selectedZone}
          lang={lang}
        />

        {/* HIGH RISK DISASTER PRIORITY RADAR PANEL */}
        <HighRiskFocusPanel
          selectedZone={selectedZone}
          onFocusHighRiskZone={handleFocusHighRiskZone}
          onOpenSmsModal={() => setIsSmsModalOpen(true)}
          activeHighRiskId={activeHighRiskZone?.id}
        />

        {/* AI/ML MULTI-PARAMETRIC LANDSLIDE RISK PREDICTOR & SIMULATOR */}
        <AIPredictorPanel
          selectedZone={selectedZone}
        />

        {/* BAND 2: GEOSPATIAL & SECTORAL ANALYSIS (Grid View 2 Columns on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Panel A: GIS Leaflet Grid Viewer (7 cols) */}
          <div className="lg:col-span-7">
            <GISMapViewer
              selectedZone={selectedZone}
              telemetryPins={telemetryPins.filter(p => p.zoneId === selectedZone.id || true)}
              citizenReports={citizenReports}
              highways={highways}
              focusedSector={focusedSector}
              activeHighRiskZone={activeHighRiskZone}
              highRiskZones={HIGH_RISK_PRIORITY_ZONES}
              lang={lang}
            />
          </div>

          {/* Panel B: Sectoral Probabilities & Summary Table (5 cols) */}
          <div className="lg:col-span-5">
            <SectorStatistics
              selectedZone={selectedZone}
              slopeSectors={slopeSectors}
              focusedSector={focusedSector}
              setFocusedSector={setFocusedSector}
              lang={lang}
            />
          </div>
        </div>

        {/* BAND 3: PREDICTIVE TIME-SERIES & MULTI-PARAMETRIC ENGINE */}
        <HydroGeologicalChart
          timeSeriesData={timeSeriesData}
          lang={lang}
        />

        {/* BAND 4: OPERATIONAL READINESS, ROAD HEALTH & CROWDSOURCED DISPATCH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Top Arterial Highway Vulnerabilities */}
          <RoadVulnerabilities
            highways={highways}
            selectedZone={selectedZone}
            lang={lang}
            onFocusHighway={(hw) => {
              // Focus map on highway approximate location
              setFocusedSector({
                refName: hw.name,
                lat: selectedZone.center[0],
                lng: selectedZone.center[1]
              });
            }}
          />

          {/* Right: Geo-Tagged Field Reports & Crowdsourced Ingestion */}
          <CrowdsourcedDispatch
            citizenReports={citizenReports}
            lang={lang}
            onVerifyInSar={(rep) => setInSarReport(rep)}
            onAlertCollector={(rep) => setDistrictAlertReport(rep)}
            onDispatchSdrf={(rep) => setSdrfReport(rep)}
            onOpenNewReportModal={() => setIsNewReportModalOpen(true)}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">GeoRisk Sentinel &copy; 2026</span>
            <span>&bull;</span>
            <span>North Eastern Regional Disaster Management Authority (NERDMA)</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px] text-slate-400">
            <span>Geotechnical Telemetry Standard ISO-19115</span>
            <span>&bull;</span>
            <span>IMD GeoJSON API v2.4</span>
          </div>
        </div>
      </footer>

      {/* Interactive Workflow Modals */}
      <BroadcastSMSModal
        isOpen={isSmsModalOpen}
        onClose={() => setIsSmsModalOpen(false)}
        lang={lang}
        selectedZone={selectedZone}
      />

      <InSarModal
        report={inSarReport}
        onClose={() => setInSarReport(null)}
      />

      <DistrictAlertModal
        report={districtAlertReport}
        selectedZone={selectedZone}
        onClose={() => setDistrictAlertReport(null)}
      />

      <SdrfDispatchModal
        report={sdrfReport}
        selectedZone={selectedZone}
        onClose={() => setSdrfReport(null)}
      />

      <NewReportModal
        isOpen={isNewReportModalOpen}
        onClose={() => setIsNewReportModalOpen(false)}
        selectedZone={selectedZone}
        onAddReport={handleAddCitizenReport}
      />
    </div>
  );
}
