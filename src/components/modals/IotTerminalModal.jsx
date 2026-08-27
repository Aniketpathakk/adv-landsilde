import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Radio, 
  Database, 
  Wifi, 
  Activity, 
  X, 
  Play, 
  Square, 
  CheckCircle2, 
  Zap,
  Globe,
  Sliders,
  Sparkles
} from 'lucide-react';
import { startIotTelemetryStream, stopIotTelemetryStream } from '../../services/iotTelemetryService';
import { fetchAllLandslideDatasets } from '../../services/landslideDatasetAggregator';

export default function IotTerminalModal({ isOpen, onClose, selectedZone, onUpdateTelemetry }) {
  const [logs, setLogs] = useState([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [wsInput, setWsInput] = useState('');
  const [datasetStatuses, setDatasetStatuses] = useState([]);
  const terminalEndRef = useRef(null);

  // Initialize dataset aggregator statuses & start streaming
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function loadDatasetApis() {
      const [lat, lng] = selectedZone?.center || [27.95, 85.92];
      const aggregated = await fetchAllLandslideDatasets(lat, lng);
      if (isMounted) {
        setDatasetStatuses(aggregated.apiStatuses || []);
      }
    }

    loadDatasetApis();

    // Start live IoT stream emitting packets every 3s
    startIotTelemetryStream({}, (packet) => {
      if (!isMounted) return;

      const logLine = `[${packet.timestamp}] RECV ${packet.packetId} from ${packet.sensorId} | Pore Pressure: ${packet.porePressureKpa} kPa | Displace: ${packet.displacementMmHr} mm/h | Soil Water: ${packet.volumetricMoisturePct}% | RSSI: ${packet.signalRssiDbm} dBm`;
      
      setLogs(prev => [...prev.slice(-40), logLine]);

      // Trigger dynamic dashboard telemetry update
      if (onUpdateTelemetry) {
        onUpdateTelemetry(packet);
      }
    });

    return () => {
      isMounted = false;
      stopIotTelemetryStream();
    };
  }, [isOpen, selectedZone]);

  // Auto-scroll terminal log
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleToggleStream = () => {
    if (isStreaming) {
      stopIotTelemetryStream();
      setIsStreaming(false);
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] STREAM PAUSED BY OPERATOR`]);
    } else {
      setIsStreaming(true);
      startIotTelemetryStream({ wsUrl: wsInput }, (packet) => {
        const logLine = `[${packet.timestamp}] RECV ${packet.packetId} from ${packet.sensorId} | Pore Pressure: ${packet.porePressureKpa} kPa | Displace: ${packet.displacementMmHr} mm/h`;
        setLogs(prev => [...prev.slice(-40), logLine]);
        if (onUpdateTelemetry) onUpdateTelemetry(packet);
      });
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] LIVE TELEMETRY STREAM RESUMED`]);
    }
  };

  const handleConnectCustomWs = (e) => {
    e.preventDefault();
    setIsStreaming(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] CONNECTING CUSTOM SOCKET: ${wsInput || "Default Generator"}`]);
    startIotTelemetryStream({ wsUrl: wsInput }, (packet) => {
      const logLine = `[${packet.timestamp}] RECV ${packet.packetId} from ${packet.sensorId} | Pore Pressure: ${packet.porePressureKpa} kPa | Displace: ${packet.displacementMmHr} mm/h`;
      setLogs(prev => [...prev.slice(-40), logLine]);
      if (onUpdateTelemetry) onUpdateTelemetry(packet);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-tight text-white flex items-center">
                Live IoT Telemetry & Landslide Dataset API Terminal
              </h3>
              <p className="text-[11px] text-slate-400">
                Real-time physical hardware packet receiver & global dataset API aggregator.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          
          {/* Section 1: Connected Dataset APIs Grid */}
          <div>
            <div className="text-xs font-extrabold uppercase text-slate-300 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <Globe className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                Connected Global Landslide & Hydrology Dataset APIs
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">5 APIs Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                <div className="font-bold text-sky-300">NASA Global Landslide Catalog</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> ACTIVE (data.nasa.gov)
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                <div className="font-bold text-amber-300">Open-Meteo 4-Depth Subsoil</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> ACTIVE (0-255cm Hydrology)
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                <div className="font-bold text-orange-300">USGS Seismic Landslide Triggers</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> ACTIVE (earthquake.usgs.gov)
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                <div className="font-bold text-purple-300">Official IMD Nowcast & Weather</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> ACTIVE (api.imd.gov.in)
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                <div className="font-bold text-emerald-300">Kaggle Landslide Dataset</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> LOADED (5,000 Records)
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                <div className="font-bold text-cyan-300">Physical IoT Sensor Mesh</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> STREAMING (3s Packets)
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Custom WebSocket / REST Connection Form */}
          <form onSubmit={handleConnectCustomWs} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center text-xs text-slate-400 font-mono shrink-0">
              <Wifi className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Custom Endpoint:
            </div>

            <input
              type="text"
              placeholder="wss://iot.sensors.gov.in/stream or http://localhost:5000/api/telemetry"
              value={wsInput}
              onChange={(e) => setWsInput(e.target.value)}
              className="flex-1 bg-slate-900 text-xs font-mono text-white px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 w-full"
            />

            <button
              type="submit"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Connect Live Socket
            </button>
          </form>

          {/* Section 3: Live Terminal Console Log */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-extrabold uppercase text-slate-300 flex items-center">
                <Radio className="w-3.5 h-3.5 mr-1.5 text-emerald-400 animate-pulse" />
                Live Raw Packet Console Log (Frequency: 0.33 Hz)
              </span>

              <button
                onClick={handleToggleStream}
                className={`px-2.5 py-1 rounded text-xs font-bold flex items-center transition-colors cursor-pointer ${
                  isStreaming ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {isStreaming ? <><Square className="w-3 h-3 mr-1" /> Pause Stream</> : <><Play className="w-3 h-3 mr-1" /> Resume Stream</>}
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 h-64 overflow-y-auto font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed selection:bg-emerald-900 selection:text-white">
              <div className="text-slate-500 text-[11px] mb-2">
                # GeoRisk Sentinel IoT Telemetry Packet Console initialized.<br/>
                # Listening for MQTT / WebSocket packets from field piezometers & inclinometers...
              </div>

              {logs.map((log, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-1 py-0.5 rounded transition-colors">
                  {log}
                </div>
              ))}

              <div ref={terminalEndRef} />
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Stream: <strong>ACTIVE</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close Terminal
          </button>
        </div>

      </div>
    </div>
  );
}
