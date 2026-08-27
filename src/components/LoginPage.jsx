import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Building2,
  Cpu,
  Radio,
  FileCheck
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('aniket.pathak@nerdma.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('lead_officer');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const PRESET_ACCOUNTS = [
    {
      id: 'lead_officer',
      name: 'Aniket Pathak',
      title: 'Lead AI Geotechnical Architect & Field Commander',
      agency: 'BRO Project Swastik / NERDMA Command',
      email: 'aniket.pathak@nerdma.gov.in',
      clearance: 'Level 3 Top-Secret (All 8 NER States + Nepal Transboundary)'
    },
    {
      id: 'sdrf_commander',
      name: 'Praveen Rai',
      title: 'Senior Disaster Response Commander',
      agency: 'SDRF Quick Reaction Taskforce (Sikkim & Kalimpong)',
      email: 'praveen.rai@sdrf.gov.in',
      clearance: 'Level 2 Emergency Evacuation Dispatcher'
    },
    {
      id: 'gsi_geologist',
      name: 'Dr. Debasish Roy',
      title: 'Chief Hydro-Geology InSAR Analyst',
      agency: 'Geological Survey of India (GSI NER HQ)',
      email: 'debasish.roy@gsi.gov.in',
      clearance: 'Level 2 Scientific Telemetry & AI Calibrator'
    }
  ];

  const handleSelectPreset = (preset) => {
    setSelectedRole(preset.id);
    setEmail(preset.email);
    setPassword('GovPasscode#2026');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const activeAccount = PRESET_ACCOUNTS.find(a => a.id === selectedRole) || {
        name: 'Authorized Officer',
        title: 'Geotechnical Officer',
        agency: 'NERDMA Command',
        email: email
      };
      
      onLoginSuccess(activeAccount);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-10 sm:px-6 lg:px-8 font-sans selection:bg-orange-200 selection:text-orange-900">
      
      {/* Top Security Banner */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20 mb-3">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          GeoRisk <span className="text-orange-600">Sentinel</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Government of India &bull; North Eastern Regional Disaster Management Authority (NERDMA)
        </p>
      </div>

      {/* Main Login Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl border border-slate-200 sm:rounded-2xl relative overflow-hidden">
          
          {/* Card Top Pill */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                Secure Agency Access Portal
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              TLS 256-Bit Encrypted
            </span>
          </div>

          {/* Preset Profile Switcher for 1-Click Fast Login */}
          <div className="mb-6">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              Select Official Role & Clearance:
            </label>
            <div className="space-y-2">
              {PRESET_ACCOUNTS.map((account) => (
                <button
                  type="button"
                  key={account.id}
                  onClick={() => handleSelectPreset(account)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedRole === account.id
                      ? 'bg-orange-50/70 border-orange-400 shadow-xs'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      selectedRole === account.id ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {account.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{account.name}</div>
                      <div className="text-[11px] text-slate-500">{account.agency}</div>
                    </div>
                  </div>
                  {selectedRole === account.id && (
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Government Email / Access ID
              </label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="name@agency.gov.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Security Passcode / Security Key
              </label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-10 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded cursor-pointer"
                />
                <span className="ml-2 font-medium">Keep session authenticated (24h)</span>
              </label>
              <span className="text-orange-600 hover:underline font-semibold cursor-pointer">
                Smart Card / OTP Login
              </span>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center">
                <AlertCircle className="w-4 h-4 mr-1.5 shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-xs font-extrabold text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-700 hover:to-amber-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Authenticating Officer Clearance...</span>
              ) : (
                <>
                  <span>Enter Geotechnical Command Center</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </button>
          </form>

          {/* Security Standards Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="flex items-center">
              <FileCheck className="w-3 h-3 text-slate-400 mr-1" />
              ISO/IEC 27001 Security
            </span>
            <span>&bull;</span>
            <span>MeitY Disaster Protocol</span>
            <span>&bull;</span>
            <span>IMD / GSI Data Gateway</span>
          </div>

        </div>
      </div>

      {/* Footer Developer Credits */}
      <div className="mt-6 text-center text-xs text-slate-500">
        GeoRisk Sentinel &copy; 2026 &bull; Developed by{' '}
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
  );
}
