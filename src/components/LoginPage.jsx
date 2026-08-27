import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  MapPin,
  Radio,
  Zap,
  Activity,
  Compass
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('aniket.pathak@nerdma.gov.in');
  const [password, setPassword] = useState('GovSecure#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('lead_officer');
  const [isLoading, setIsLoading] = useState(false);

  const NER_STATES = [
    { name: "Arunachal Pradesh", code: "AR", pin: "Sela & Tawang", lat: "27.5°N" },
    { name: "Assam", code: "AS", pin: "Dima Hasao", lat: "25.2°N" },
    { name: "Manipur", code: "MN", pin: "Tupul Cut", lat: "24.8°N" },
    { name: "Meghalaya", code: "ML", pin: "Shillong Ridge", lat: "25.6°N" },
    { name: "Mizoram", code: "MZ", pin: "Aizawl Slope", lat: "23.7°N" },
    { name: "Nagaland", code: "NL", pin: "Kohima Spine", lat: "25.7°N" },
    { name: "Sikkim", code: "SK", pin: "Teesta Gorge", lat: "27.3°N" },
    { name: "Tripura", code: "TR", pin: "Jampui Hills", lat: "23.9°N" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: selectedRole === 'lead_officer' ? 'Aniket Pathak' : 'Field Operations Officer',
        title: 'Lead AI Geotechnical Architect & Field Commander',
        agency: 'NERDMA Command / BRO Project Swastik',
        email: email,
        clearance: 'Level 3 Top-Secret (All 8 NER States + Nepal Transboundary)'
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans overflow-hidden">
      
      {/* ========================================================================= */}
      {/* BACKGROUND: Stylized Map of India with North Eastern Region (NER) Highlighted */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-90">
        
        {/* Subtle Grid Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>

        {/* Vector Silhouette Graphic of India + Highlighted NER Spine */}
        <svg 
          viewBox="0 0 1000 800" 
          className="w-[1200px] h-[950px] text-slate-200 select-none transition-transform duration-1000"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Silhouette of Mainland India Outline */}
          <path 
            d="M 280,180 Q 320,120 370,100 Q 420,80 460,110 Q 500,140 520,190 L 550,230 Q 570,250 590,240 L 630,230 Q 660,240 680,270 L 670,320 Q 640,350 630,390 L 600,430 Q 570,490 530,550 Q 500,600 480,670 Q 470,710 450,750 Q 430,710 400,650 Q 360,570 330,500 Q 290,440 270,390 Q 240,340 230,290 Q 220,240 250,200 Z" 
            fill="#F1F5F9" 
            stroke="#CBD5E1" 
            strokeWidth="2.5" 
            strokeDasharray="4 4"
          />

          {/* Himalayan Arc Mountain Spine */}
          <path 
            d="M 370,120 Q 480,170 590,240 Q 660,250 740,230 Q 820,210 880,240" 
            stroke="#94A3B8" 
            strokeWidth="3" 
            strokeLinecap="round"
          />

          {/* ============================================================= */}
          {/* HIGHLIGHTED NORTH EASTERN REGION (NER) - 8 STATES CORRIDOR */}
          {/* ============================================================= */}
          
          {/* Glow backdrop behind NER */}
          <ellipse cx="780" cy="280" rx="160" ry="120" fill="#FED7AA" opacity="0.45" />

          {/* NER Polygon Territory */}
          <path 
            d="M 680,270 L 730,240 Q 770,210 830,215 Q 890,230 920,260 Q 930,300 890,340 L 860,370 Q 820,400 780,390 L 750,370 Q 720,380 700,350 L 680,310 Z" 
            fill="#FFEDD5" 
            stroke="#EA580C" 
            strokeWidth="3.5"
            className="filter drop-shadow-md"
          />

          {/* Telemetry Radar Beacons in NER */}
          {/* 1. Sikkim (Gangtok & Teesta) */}
          <g transform="translate(685, 260)">
            <circle cx="0" cy="0" r="14" fill="#EA580C" opacity="0.2" className="animate-ping" />
            <circle cx="0" cy="0" r="5" fill="#EA580C" />
            <text x="8" y="4" fill="#C2410C" fontSize="12" fontWeight="bold" fontFamily="monospace">Sikkim (Teesta)</text>
          </g>

          {/* 2. Arunachal Pradesh (Tawang & Sela) */}
          <g transform="translate(820, 230)">
            <circle cx="0" cy="0" r="18" fill="#EA580C" opacity="0.25" className="animate-ping" />
            <circle cx="0" cy="0" r="6" fill="#DC2626" />
            <text x="10" y="4" fill="#991B1B" fontSize="13" fontWeight="bold" fontFamily="monospace">Arunachal (Sela Pass)</text>
          </g>

          {/* 3. Assam (Guwahati & Dima Hasao) */}
          <g transform="translate(770, 290)">
            <circle cx="0" cy="0" r="12" fill="#F97316" opacity="0.2" className="animate-ping" />
            <circle cx="0" cy="0" r="5" fill="#EA580C" />
            <text x="8" y="4" fill="#C2410C" fontSize="12" fontWeight="bold" fontFamily="monospace">Assam (Dima Hasao)</text>
          </g>

          {/* 4. Meghalaya (Shillong) */}
          <g transform="translate(740, 320)">
            <circle cx="0" cy="0" r="5" fill="#EA580C" />
            <text x="8" y="4" fill="#C2410C" fontSize="11" fontWeight="bold" fontFamily="monospace">Meghalaya</text>
          </g>

          {/* 5. Nagaland (Kohima) */}
          <g transform="translate(845, 295)">
            <circle cx="0" cy="0" r="5" fill="#EA580C" />
            <text x="8" y="4" fill="#C2410C" fontSize="11" fontWeight="bold" fontFamily="monospace">Nagaland (NH-29)</text>
          </g>

          {/* 6. Manipur (Tupul Cut) */}
          <g transform="translate(835, 335)">
            <circle cx="0" cy="0" r="14" fill="#DC2626" opacity="0.3" className="animate-ping" />
            <circle cx="0" cy="0" r="5" fill="#DC2626" />
            <text x="8" y="4" fill="#991B1B" fontSize="11" fontWeight="bold" fontFamily="monospace">Manipur (Tupul)</text>
          </g>

          {/* 7. Mizoram (Aizawl) */}
          <g transform="translate(800, 370)">
            <circle cx="0" cy="0" r="14" fill="#EA580C" opacity="0.2" className="animate-ping" />
            <circle cx="0" cy="0" r="5" fill="#EA580C" />
            <text x="8" y="4" fill="#C2410C" fontSize="11" fontWeight="bold" fontFamily="monospace">Mizoram (Aizawl)</text>
          </g>

          {/* 8. Tripura (Jampui) */}
          <g transform="translate(755, 360)">
            <circle cx="0" cy="0" r="4" fill="#EA580C" />
            <text x="-48" y="4" fill="#C2410C" fontSize="11" fontWeight="bold" fontFamily="monospace">Tripura</text>
          </g>

          {/* 9. Nepal Transboundary Gateway */}
          <g transform="translate(620, 240)">
            <circle cx="0" cy="0" r="16" fill="#DC2626" opacity="0.3" className="animate-ping" />
            <circle cx="0" cy="0" r="5" fill="#DC2626" />
            <text x="-120" y="4" fill="#DC2626" fontSize="11" fontWeight="bold" fontFamily="monospace">Nepal Dam Breach</text>
          </g>

          {/* Highlight Badge Overlay */}
          <g transform="translate(750, 160)">
            <rect x="0" y="0" width="220" height="34" rx="17" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
            <text x="110" y="21" fill="#C2410C" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              🛰️ 8 NER States High-Risk Grid Active
            </text>
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* FOREGROUND: Simple, Elegant Government Login Card */}
      {/* ========================================================================= */}
      <div className="w-full max-w-md z-10 relative">
        
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xl p-6 sm:p-8">
          
          {/* Card Header & Shield */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 text-white shadow-md shadow-orange-500/25 mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center space-x-1.5">
              <span>GeoRisk</span>
              <span className="text-orange-600">Sentinel</span>
            </h1>

            <p className="text-xs text-slate-500 font-medium mt-1">
              North Eastern Regional Disaster Management Authority (NERDMA)
            </p>

            <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span>8 NER States &bull; 24/7 AI Geotechnical Command</span>
            </div>
          </div>

          {/* Simple Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Agency Email
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  placeholder="aniket.pathak@nerdma.gov.in"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Passcode / Clearance Key
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me / Help */}
            <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-3.5 w-3.5 text-orange-600 focus:ring-orange-500 border-slate-300 rounded cursor-pointer"
                />
                <span className="ml-1.5 font-medium text-[11px]">Save Officer Session</span>
              </label>
              <span className="text-orange-600 font-semibold hover:underline cursor-pointer text-[11px]">
                Smart Token Login
              </span>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-xs font-extrabold text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-700 hover:to-amber-700 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Accessing NER Geotechnical Command...</span>
              ) : (
                <>
                  <span>Enter Geotechnical Command Center</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick 8 NER States Coverage Badge Strip */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Active Monitoring Coverage (8 NER States):
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {NER_STATES.map((s) => (
                <span 
                  key={s.code}
                  className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono font-bold"
                  title={`${s.name} (${s.pin})`}
                >
                  {s.code}: {s.name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Security Certifications */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="flex items-center">
              <ShieldCheck className="w-3 h-3 text-emerald-600 mr-1" />
              ISO-19115 Standard
            </span>
            <span>&bull;</span>
            <span>IMD Doppler Stream</span>
            <span>&bull;</span>
            <span>Sentinel-1 SAR</span>
          </div>

        </div>

        {/* Footer Attribution */}
        <div className="mt-4 text-center text-xs text-slate-500">
          GeoRisk Sentinel &bull; Developed by{' '}
          <a
            href="https://in.linkedin.com/in/aniiketpathak"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-orange-600 hover:underline"
          >
            Aniket Pathak
          </a>
        </div>

      </div>
    </div>
  );
}
