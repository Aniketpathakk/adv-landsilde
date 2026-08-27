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
  FileCheck,
  Building2,
  Compass
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('aniket.pathak@nerdma.gov.in');
  const [password, setPassword] = useState('GovSecure#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const NER_STATES = [
    { name: "Arunachal Pradesh", code: "AR" },
    { name: "Assam", code: "AS" },
    { name: "Manipur", code: "MN" },
    { name: "Meghalaya", code: "ML" },
    { name: "Mizoram", code: "MZ" },
    { name: "Nagaland", code: "NL" },
    { name: "Sikkim", code: "SK" },
    { name: "Tripura", code: "TR" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Aniket Pathak',
        title: 'Lead AI Geotechnical Architect & Field Commander',
        agency: 'NERDMA Command / BRO Project Swastik',
        email: email,
        clearance: 'Level 3 Top-Secret (All 8 NER States + Nepal Transboundary)'
      });
    }, 500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-orange-200 selection:text-orange-900 overflow-hidden bg-slate-950">
      
      {/* Background: Photorealistic 3D Topographic India & NER Satellite Map */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 filter brightness-[0.78] contrast-[1.05]"
        style={{ backgroundImage: `url('/assets/india_ner_bg.jpg')` }}
      >
        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/80" />
      </div>

      {/* Foreground Login Card */}
      <div className="w-full max-w-md z-10 relative animate-in fade-in zoom-in-95 duration-300">
        
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/40 shadow-2xl p-6 sm:p-8 text-slate-900">
          
          {/* Card Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25 mb-3">
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Agency Email
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-2xs"
                  placeholder="aniket.pathak@nerdma.gov.in"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Passcode / Clearance Key
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-2xs"
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

          {/* 8 NER States Coverage Badge Strip */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Active Monitoring Coverage (8 NER States):
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {NER_STATES.map((s) => (
                <span 
                  key={s.code}
                  className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono font-bold"
                  title={s.name}
                >
                  {s.code}: {s.name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Security Standards Footer */}
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
        <div className="mt-4 text-center text-xs text-white/80 font-medium drop-shadow-md">
          GeoRisk Sentinel &bull; Developed by{' '}
          <a
            href="https://in.linkedin.com/in/aniiketpathak"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-orange-400 hover:underline"
          >
            Aniket Pathak
          </a>
        </div>

      </div>
    </div>
  );
}
