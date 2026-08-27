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
import { subscribeLiveProductionPipeline } from './services/liveProductionPipelines';

// Modals
import BroadcastSMSModal from './components/modals/BroadcastSMSModal';
import InSarModal from './components/modals/InSarModal';
import DistrictAlertModal from './components/modals/DistrictAlertModal';
import SdrfDispatchModal from './components/modals/SdrfDispatchModal';
import NewReportModal from './components/modals/NewReportModal';
import IotTerminalModal from './components/modals/IotTerminalModal';
import LiveProductionGatewayModal from './components/modals/LiveProductionGatewayModal';

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

  // Live Production Ingestion State
  const [liveStreamPayload, setLiveStreamPayload] = useState(null);
  const [isLiveGatewayOpen, setIsLiveGatewayOpen] = useState(false);

  // Modals state
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [inSarReport, setInSarReport] = useState(null);
  const [districtAlertReport, setDistrictAlertReport] = useState(null);
  const [sdrfReport, setSdrfReport] = useState(null);
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
  const [isIotTerminalOpen, setIsIotTerminalOpen] = useState(false);
  const [syncToast, setSyncToast] = useState(null);

  // 24/7 Live Government Production Pipeline Subscription (IMD + Sentinel-1 + GSI/BRO IoT)
  useEffect(() => {
    if (isOffline) return;

    const unsubscribe = subscribeLiveProductionPipeline(selectedZone, (payload) => {
      setLiveStreamPayload(payload);
      setLastSyncTime(payload.timestamp);
    });

    return () => unsubscribe();
  }, [selectedZone, isOffline]);

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
        onOpenIotTerminal={() => setIsIotTerminalOpen(true)}
        onOpenLiveGovGateway={() => setIsLiveGatewayOpen(true)}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span className="font-bold text-slate-800">GeoRisk Sentinel &copy; 2026</span>
            <span>&bull;</span>
            <span>North Eastern Regional Disaster Management Authority (NERDMA)</span>
            <span>&bull;</span>
            <span className="inline-flex items-center text-slate-700">
              Developed by&nbsp;
              <a
                href="https://in.linkedin.com/in/aniiketpathak"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-extrabold text-orange-600 hover:text-orange-700 hover:underline transition-colors ml-0.5 group"
              >
                <span>Aniket Pathak</span>
                <svg className="w-3.5 h-3.5 ml-1 text-[#0A66C2] fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                </svg>
              </a>
            </span>
          </div>
          <div className="flex items-center space-x-3 font-mono text-[11px] text-slate-400">
            <span>Geotechnical Standard ISO-19115</span>
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

      <IotTerminalModal
        isOpen={isIotTerminalOpen}
        onClose={() => setIsIotTerminalOpen(false)}
        selectedZone={selectedZone}
        onUpdateTelemetry={(pkt) => {
          setLastSyncTime(pkt.timestamp);
          if (pkt.porePressureKpa > 230) {
            setSyncToast(`⚠️ HIGH PORE PRESSURE ALERT: ${pkt.sensorId} (${pkt.porePressureKpa} kPa)`);
            setTimeout(() => setSyncToast(null), 3000);
          }
        }}
      />

      <LiveProductionGatewayModal
        isOpen={isLiveGatewayOpen}
        onClose={() => setIsLiveGatewayOpen(false)}
        selectedZone={selectedZone}
        liveStreamPayload={liveStreamPayload}
      />
    </div>
  );
}
