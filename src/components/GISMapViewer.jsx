import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  Map, 
  Compass, 
  Activity, 
  Radio, 
  AlertOctagon,
  Maximize2,
  Minimize2,
  RefreshCw,
  Navigation,
  Flame
} from 'lucide-react';
import { TRANSLATIONS, RASTER_HEATMAP_GRID } from '../data/mockData';
import { getZoneRoadNetwork } from '../services/roadNetworkService';

const BASEMAPS = {
  satellite: {
    name: 'Esri Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS'
  },
  googleHybrid: {
    name: 'Google Hybrid',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps Imagery'
  },
  googleTerrain: {
    name: 'Google Terrain',
    url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps Terrain'
  },
  street: {
    name: 'OSM Standard',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  cartoLight: {
    name: 'Carto Light',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
  }
};

// Colors based on GeoRisk hazard gradients
function getRiskColor(risk) {
  if (risk >= 0.9) return '#EF4444'; // Red (Critical)
  if (risk >= 0.7) return '#F97316'; // Orange (Warning)
  if (risk >= 0.5) return '#FBBF24'; // Yellow (Watch)
  return '#10B981'; // Green (Safe)
}

export default function GISMapViewer({
  selectedZone,
  telemetryPins,
  citizenReports,
  highways,
  focusedSector,
  activeHighRiskZone,
  highRiskZones,
  lang,
  onSelectPin
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [activeBasemap, setActiveBasemap] = useState('street');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showHighways, setShowHighways] = useState(false);
  const [showTelemetry, setShowTelemetry] = useState(true);
  const [showCitizenReports, setShowCitizenReports] = useState(true);
  const [showHighRiskPolygons, setShowHighRiskPolygons] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [roadLines, setRoadLines] = useState([]);
  const [flyingZoneName, setFlyingZoneName] = useState(null);

  // Fetch real road vectors for the active zone
  useEffect(() => {
    let isMounted = true;
    async function loadRoads() {
      const roads = await getZoneRoadNetwork(selectedZone);
      if (isMounted && roads) {
        setRoadLines(roads);
      }
    }
    loadRoads();
    return () => { isMounted = false; };
  }, [selectedZone?.id]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: selectedZone.center,
        zoom: selectedZone.zoom,
        zoomControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      // Add Base Tile Layer
      const baseConfig = BASEMAPS[activeBasemap];
      const tileLayer = L.tileLayer(baseConfig.url, {
        attribution: baseConfig.attribution,
        maxZoom: 19
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Group for dynamic markers and layers
      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Smooth flyTo animation when user switches zone/state
  useEffect(() => {
    if (mapInstanceRef.current && selectedZone) {
      setFlyingZoneName(`${selectedZone.name} (${selectedZone.state})`);
      mapInstanceRef.current.flyTo(selectedZone.center, selectedZone.zoom, {
        duration: 1.8,
        easeLinearity: 0.25
      });

      const timer = setTimeout(() => {
        setFlyingZoneName(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [selectedZone]);

  // Smooth flyTo when focused sector changes
  useEffect(() => {
    if (mapInstanceRef.current && focusedSector) {
      mapInstanceRef.current.flyTo([focusedSector.lat, focusedSector.lng], 14, {
        duration: 1.2
      });
    }
  }, [focusedSector]);

  // Smooth flyTo when active high risk zone changes
  useEffect(() => {
    if (mapInstanceRef.current && activeHighRiskZone) {
      mapInstanceRef.current.flyTo(activeHighRiskZone.center, 13, {
        duration: 1.5
      });
    }
  }, [activeHighRiskZone]);

  // Update Tile Layer when basemap changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const baseConfig = BASEMAPS[activeBasemap];
    tileLayerRef.current.setUrl(baseConfig.url);
  }, [activeBasemap]);

  // Render Overlays (Heatmap Grid, High Risk Polygons, Highways, Pins, Reports)
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;
    const group = layerGroupRef.current;
    group.clearLayers();

    // 0. High Risk Danger Zone Polygons
    if (showHighRiskPolygons && highRiskZones) {
      highRiskZones.forEach((hr) => {
        const isFocused = activeHighRiskZone?.id === hr.id;
        const poly = L.polygon(hr.polygonCoords, {
          color: '#EF4444',
          fillColor: '#EF4444',
          fillOpacity: isFocused ? 0.45 : 0.25,
          weight: isFocused ? 4 : 2,
          dashArray: isFocused ? '4, 4' : '6, 6'
        });

        poly.bindPopup(`
          <div style="font-family: sans-serif; padding: 6px; min-width: 230px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: 800; font-size: 10px; text-transform: uppercase; color: #DC2626; background: #FEF2F2; padding: 2px 6px; border-radius: 4px; border: 1px solid #FECACA;">
                High Risk Danger Zone (${(hr.disasterPossibilityScore * 100).toFixed(0)}%)
              </span>
            </div>
            <div style="font-weight: 700; font-size: 13px; color: #0F172A; margin-bottom: 4px;">${hr.name}</div>
            <div style="font-size: 11px; color: #334155; line-height: 1.4;">
              <div>Primary Hazard: <strong>${hr.primaryHazard}</strong></div>
              <div>Pop. at Risk: <strong>${hr.populationAtRisk.toLocaleString()}</strong></div>
              <div>Displacement Velocity: <strong style="color: #DC2626">${hr.displacementRate}</strong></div>
              <div>Pore Pressure: <strong>${hr.porePressureKpa} kPa</strong></div>
              <div style="margin-top: 6px; padding: 4px; background: #FFF7ED; border: 1px solid #FFEDD5; border-radius: 4px; color: #C2410C; font-weight: 700;">
                ${hr.recommendedAction}
              </div>
            </div>
          </div>
        `);

        group.addLayer(poly);
      });
    }

    // 1. Heatmap Grid
    if (showHeatmap) {
      RASTER_HEATMAP_GRID.forEach((cell) => {
        const color = getRiskColor(cell.risk);
        const circle = L.circle([cell.lat, cell.lng], {
          radius: 450,
          color: color,
          fillColor: color,
          fillOpacity: 0.35,
          weight: 1
        });
        circle.bindTooltip(`Landslide Risk Index: ${cell.risk}`, { direction: 'top' });
        group.addLayer(circle);
      });
    }

    // 2. National Highway Hazard Checkpoints & Active Road Hazard Alerts
    if (showHighways && roadLines && roadLines.length > 0) {
      roadLines.forEach((road) => {
        const status = road.status || 'Passable';
        const isBlocked = status.includes('Blocked') || status.includes('Catastrophic');
        const color = isBlocked ? '#EF4444' : status.includes('One-Lane') || status.includes('Watch') ? '#F97316' : '#10B981';

        // Draw smooth polyline if coordinates array exists and has valid bounds
        if (road.coordinates && road.coordinates.length > 1) {
          const polyline = L.polyline(road.coordinates, {
            color: color,
            weight: 3.5,
            dashArray: isBlocked ? '6, 6' : null,
            opacity: 0.85,
            lineCap: 'round',
            lineJoin: 'round'
          });

          polyline.bindPopup(`
            <div style="font-family: sans-serif; padding: 6px; max-width: 260px;">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                <span style="background: #0f172a; color: #f8fafc; padding: 2px 6px; border-radius: 4px; font-weight: 800; font-size: 10px; font-family: monospace;">
                  ${road.ref || 'HIGHWAY'}
                </span>
                <span style="font-size: 10px; color: #64748b; font-weight: 600;">${road.type || 'Corridor'}</span>
              </div>
              
              <div style="font-weight: 800; color: #0f172a; font-size: 12px; margin-bottom: 4px;">
                ${road.name}
              </div>

              <div style="background: #f8fafc; padding: 5px 8px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 11px;">
                <div>Status: <strong style="color: ${color}; text-transform: uppercase;">${status}</strong></div>
                ${road.displacementRate ? `<div style="color: #475569; margin-top: 2px;">Velocity: <strong>${road.displacementRate}</strong></div>` : ''}
              </div>

              ${road.detour ? `<div style="font-size: 10px; color: #d97706; background: #fffbeb; padding: 4px 6px; border-radius: 4px; border: 1px solid #fde68a; margin-top: 4px;">⚠️ Detour: ${road.detour}</div>` : ''}
            </div>
          `);

          group.addLayer(polyline);
        }

        // Render pinpoint Road Hazard Station marker at mid-point of the corridor
        if (road.coordinates && road.coordinates.length > 0) {
          const midPoint = road.coordinates[Math.floor(road.coordinates.length / 2)];
          if (midPoint && midPoint.length === 2) {
            const roadIconHtml = `
              <div style="
                background: ${isBlocked ? '#EF4444' : '#F97316'};
                color: #FFFFFF;
                border: 2px solid #FFFFFF;
                border-radius: 9999px;
                width: 26px;
                height: 26px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                font-weight: 800;
              " title="${road.name} (${status})">
                🛣️
              </div>
            `;

            const roadMarkerIcon = L.divIcon({
              html: roadIconHtml,
              className: '',
              iconSize: [26, 26],
              iconAnchor: [13, 13]
            });

            const marker = L.marker(midPoint, { icon: roadMarkerIcon });
            marker.bindPopup(`
              <div style="font-family: sans-serif; padding: 4px; max-width: 220px;">
                <div style="font-size: 10px; font-weight: 700; color: ${color}; text-transform: uppercase;">Road Hazard Station</div>
                <div style="font-weight: 700; font-size: 12px; color: #0f172a; margin-top: 2px;">${road.name}</div>
                <div style="font-size: 11px; color: #475569; margin-top: 2px;">Status: <strong style="color: ${color}">${status}</strong></div>
              </div>
            `);
            group.addLayer(marker);
          }
        }
      });
    }

    // 3. Telemetry Pins (Piezometers / Inclinometers)
    if (showTelemetry && telemetryPins) {
      telemetryPins.forEach((pin) => {
        const pinColor = getRiskColor(pin.riskScore);
        const iconHtml = `
          <div style="
            background: #FFFFFF;
            border: 2px solid ${pinColor};
            border-radius: 9999px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            cursor: pointer;
            position: relative;
          ">
            <span style="
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: ${pinColor};
              display: block;
            "></span>
            ${pin.riskScore >= 0.8 ? `<span style="
              position: absolute;
              top: -3px;
              right: -3px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #EF4444;
              border: 1px solid white;
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></span>` : ''}
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([pin.lat, pin.lng], { icon: customIcon });

        const popupContent = `
          <div style="font-family: sans-serif; padding: 6px; min-width: 220px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-[700]; font-size: 11px; text-transform: uppercase; color: ${pinColor}; border: 1px solid ${pinColor}; padding: 1px 6px; border-radius: 4px; background: #fafafa;">
                ${pin.type} (${pin.id})
              </span>
              <span style="font-size: 10px; color: #94a3b8;">${pin.lastUpdated}</span>
            </div>
            <div style="font-weight: 700; font-size: 13px; color: #0f172a; margin-bottom: 6px;">${pin.name}</div>
            <div style="font-size: 11px; color: #334155; line-height: 1.5;">
              <div>Pore Pressure: <strong>${pin.porePressureKpa} kPa</strong></div>
              <div>Volumetric Soil Water: <strong>${pin.volumetricWaterContentPct}%</strong></div>
              <div>Slope Angle: <strong>${pin.slopeAngleDeg}°</strong></div>
              <div>Displacement Velocity: <strong>${pin.displacementMmHr} mm/hr</strong></div>
              <div style="margin-top: 4px; font-weight: 700; color: ${pinColor};">Risk Score: ${(pin.riskScore * 100).toFixed(0)}%</div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.on('click', () => {
          if (onSelectPin) onSelectPin(pin);
        });
        group.addLayer(marker);
      });
    }

    // 4. Citizen Reports Pins
    if (showCitizenReports && citizenReports) {
      citizenReports.forEach((rep) => {
        const iconHtml = `
          <div style="
            background: #FEF2F2;
            border: 2px solid #EF4444;
            border-radius: 8px;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(239,68,68,0.25);
            cursor: pointer;
          ">
            <span style="font-size: 14px; font-weight: bold; color: #B91C1C;">!</span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: '',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker([rep.lat, rep.lng], { icon: customIcon });

        const popupContent = `
          <div style="font-family: sans-serif; padding: 4px; max-width: 220px;">
            <div style="font-size: 10px; font-weight: 700; color: #dc2626; text-transform: uppercase;">Citizen Field Alert</div>
            <div style="font-weight: 700; font-size: 12px; color: #0f172a; margin-top: 2px;">${rep.category}</div>
            <div style="font-size: 11px; color: #475569; margin-top: 4px;">Crack Width: <strong>${rep.crackWidthCm} cm</strong></div>
            <div style="font-size: 10px; color: #64748b; margin-top: 2px;">${rep.location}</div>
          </div>
        `;

        marker.bindPopup(popupContent);
        group.addLayer(marker);
      });
    }

  }, [showHeatmap, showHighways, showTelemetry, showCitizenReports, showHighRiskPolygons, selectedZone, telemetryPins, citizenReports, highways, roadLines, activeHighRiskZone]);

  return (
    <div className={`georisk-card overflow-hidden flex flex-col relative transition-all duration-300 ${
      isExpanded ? 'fixed inset-4 z-50 shadow-2xl h-[calc(100vh-2rem)]' : 'h-[500px]'
    }`}>
      {/* Map Control Bar Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 z-10">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-orange-600 animate-spin-slow" />
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            {t.gis.title} &mdash; <span className="text-orange-600 font-semibold">{selectedZone.name}</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Basemap Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            {Object.keys(BASEMAPS).map((key) => (
              <button
                key={key}
                onClick={() => setActiveBasemap(key)}
                className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  activeBasemap === key
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {BASEMAPS[key].name}
              </button>
            ))}
          </div>

          {/* Layer Overlay Toggles */}
          <div className="flex items-center space-x-1 border-l border-slate-200 pl-2">
            <button
              onClick={() => setShowHighRiskPolygons(!showHighRiskPolygons)}
              className={`p-1.5 rounded-md text-xs font-bold flex items-center transition-colors cursor-pointer ${
                showHighRiskPolygons ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-50 text-slate-400 border border-slate-200'
              }`}
              title="Toggle High Risk Disaster Polygons"
            >
              <Flame className="w-3.5 h-3.5 mr-1 text-red-600 animate-pulse" />
              <span>High Risk</span>
            </button>

            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center transition-colors cursor-pointer ${
                showHeatmap ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-slate-50 text-slate-400 border border-slate-200'
              }`}
              title="Toggle 2D Probability Heatmap"
            >
              <Activity className="w-3.5 h-3.5 mr-1" />
              <span>Grid</span>
            </button>

            <button
              onClick={() => setShowHighways(!showHighways)}
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center transition-colors cursor-pointer ${
                showHighways ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-slate-50 text-slate-400 border border-slate-200'
              }`}
              title="Toggle National Highway Overlays"
            >
              <Navigation className="w-3.5 h-3.5 mr-1" />
              <span>Roads</span>
            </button>

            <button
              onClick={() => setShowTelemetry(!showTelemetry)}
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center transition-colors cursor-pointer ${
                showTelemetry ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-slate-50 text-slate-400 border border-slate-200'
              }`}
              title="Toggle Telemetry Piezometer Pins"
            >
              <Radio className="w-3.5 h-3.5 mr-1" />
              <span>Sensors</span>
            </button>

            <button
              onClick={() => setShowCitizenReports(!showCitizenReports)}
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center transition-colors cursor-pointer ${
                showCitizenReports ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-slate-50 text-slate-400 border border-slate-200'
              }`}
              title="Toggle Citizen Field Geotags"
            >
              <AlertOctagon className="w-3.5 h-3.5 mr-1" />
              <span>Citizen</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isExpanded ? "Minimize Map" : "Maximize Map"}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Leaflet Canvas Container */}
      <div className="flex-1 w-full h-full relative">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Animated Satellite Flight Repositioning Badge */}
        {flyingZoneName && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 backdrop-blur-md text-white border border-orange-500/50 shadow-xl px-4 py-2 rounded-full flex items-center space-x-2 text-xs font-mono animate-in fade-in zoom-in duration-300 pointer-events-none">
            <Navigation className="w-4 h-4 text-orange-400 animate-spin-slow" />
            <span>Satellite GIS Focus: <strong className="text-orange-300">{flyingZoneName}</strong></span>
          </div>
        )}

        {/* Floating GeoRisk Hazard Gradient Legend (Inspired by GeoRiskPH) */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg p-3 shadow-md max-w-xs text-xs">
          <div className="font-bold text-slate-900 mb-2 flex items-center justify-between">
            <span>{t.gis.legend}</span>
            <span className="text-[10px] text-slate-400 font-mono">GeoRisk Grid</span>
          </div>

          {/* Color Scale Gradient Bar */}
          <div className="h-3.5 rounded-md w-full mb-2 bg-gradient-to-r from-emerald-500 via-amber-400 via-orange-500 to-red-600 border border-slate-300"></div>

          <div className="grid grid-cols-4 text-[10px] font-semibold text-slate-600 text-center gap-1">
            <div className="bg-emerald-50 text-emerald-800 p-1 rounded border border-emerald-200">
              0.0 - 0.5<br/><span className="font-bold">Safe / Mint</span>
            </div>
            <div className="bg-amber-50 text-amber-800 p-1 rounded border border-amber-200">
              0.5 - 0.7<br/><span className="font-bold">Watch</span>
            </div>
            <div className="bg-orange-50 text-orange-800 p-1 rounded border border-orange-200">
              0.7 - 0.9<br/><span className="font-bold">Warning</span>
            </div>
            <div className="bg-red-50 text-red-800 p-1 rounded border border-red-200">
              0.9 - 1.0<br/><span className="font-bold">Evacuate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
