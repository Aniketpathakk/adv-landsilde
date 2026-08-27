import React, { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  Send, 
  ShieldAlert, 
  Plus,
  Satellite,
  UserCheck
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function CrowdsourcedDispatch({
  citizenReports,
  lang,
  onVerifyInSar,
  onAlertCollector,
  onDispatchSdrf,
  onOpenNewReportModal
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="georisk-card p-5 flex flex-col h-full">
      {/* Header & Submit Button */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2.5">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-orange-600" />
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            {t.dispatch.title}
          </h2>
        </div>

        <button
          onClick={onOpenNewReportModal}
          className="flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-2xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          <span>{t.dispatch.submitNew}</span>
        </button>
      </div>

      {/* Reports Feed */}
      <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {citizenReports.map((report) => (
          <div
            key={report.id}
            className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-orange-200 transition-all shadow-2xs"
          >
            {/* Top row: Category & Status */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">
                  {report.id} &bull; {report.timestamp}
                </span>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                  {report.category}
                </h3>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                report.verified
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {report.verified ? 'Verified' : 'Pending Verification'}
              </span>
            </div>

            {/* Middle row: Image Thumbnail & Details */}
            <div className="flex gap-3 my-2.5">
              <img
                src={report.photoUrl}
                alt={report.category}
                className="w-16 h-16 rounded-md object-cover border border-slate-200 shrink-0 bg-slate-100"
              />
              <div className="text-[11px] text-slate-600 space-y-1">
                <p className="flex items-center text-slate-800 font-semibold">
                  <MapPin className="w-3 h-3 text-orange-600 mr-1 shrink-0" />
                  {report.location}
                </p>
                <p>Crack Width: <strong className="text-slate-900 font-mono">{report.crackWidthCm} cm</strong></p>
                <p className="text-slate-400 text-[10px]">
                  Submitted by: <strong>{report.author}</strong>
                </p>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-[11px]">
              <button
                onClick={() => onVerifyInSar(report)}
                className="flex-1 min-w-[100px] flex items-center justify-center px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors cursor-pointer"
              >
                <Satellite className="w-3 h-3 text-indigo-600 mr-1" />
                <span>{t.dispatch.insarVerify}</span>
              </button>

              <button
                onClick={() => onAlertCollector(report)}
                className="flex-1 min-w-[110px] flex items-center justify-center px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold transition-colors cursor-pointer"
              >
                <Send className="w-3 h-3 text-amber-600 mr-1" />
                <span>{t.dispatch.alertCollector}</span>
              </button>

              <button
                onClick={() => onDispatchSdrf(report)}
                className="flex-1 min-w-[100px] flex items-center justify-center px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-900 border border-red-200 font-bold transition-colors cursor-pointer"
              >
                <ShieldAlert className="w-3 h-3 text-red-600 mr-1" />
                <span>{t.dispatch.dispatchSdrf}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
