import React, { useState } from 'react';
import { X, Send, Radio, CheckCircle, ShieldAlert, Globe, Users } from 'lucide-react';
import { TRANSLATIONS } from '../../data/mockData';

const SAMPLE_SMS = {
  en: "EMERGENCY LANDSLIDE ALERT: IMD reports extreme rainfall (>150mm/24h) in East Sikkim/Kalimpong. High risk of debris flow on NH-10. Seek high ground immediately. Emergency Helpline: 1077.",
  hi: "आपातकालीन भूस्खलन चेतावनी: मौसम विभाग ने अत्यधिक वर्षा की घोषणा की है। NH-10 मार्ग पर भूस्खलन का भारी खतरा है। सुरक्षित स्थान पर रहें। आपातकालीन नंबर: 1077.",
  as: "জৰুৰীকালীন ভূমিস্খলন সকীয়ানী: অতিপাত বৰষুণৰ বাবে ৰাষ্ট্ৰীয় ঘাইপথ NH-10ত ভূমিস্খলনৰ তীব্ৰ সম্ভাৱনা। নিৰাপদ স্থানত আশ্ৰয় লওক। হেল্পলাইন: ১০৭৭।",
  bn: "জরুরী ধস সতর্কবার্তা: প্রবল বৃষ্টিপাতের কারণে জাতীয় সড়ক NH-10 ধসের প্রবল ঝুঁকিতে। অবিলম্বে নিরাপদ আশ্রয়ে যান। হেল্পলাইন: ১০৭৭।",
  mz: "KHUAVANG EMERGENCY ALERT: Ruah sur nasat vangin NH-10 lamah kawn min hlauhawm zual. In himna zawng vat rawh u. Emergency Helpline: 1077."
};

export default function BroadcastSMSModal({ isOpen, onClose, lang, selectedZone }) {
  if (!isOpen) return null;

  const [smsLang, setSmsLang] = useState(lang || 'en');
  const [selectedPanchayats, setSelectedPanchayats] = useState(['Zone Sector 1', 'Gram Panchayat Mile 9', 'NH-10 Corridor Transit Nodes']);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [recipientsCount, setRecipientsCount] = useState(14850);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-orange-500 animate-pulse" />
            <h2 className="text-base font-bold tracking-tight">
              Broadcast Emergency Disaster SMS
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {!isSent ? (
            <>
              {/* Target Zone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Targeted Administrative Zone
                </label>
                <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 flex items-center justify-between">
                  <span>{selectedZone.name} ({selectedZone.state})</span>
                  <span className="text-[11px] font-mono text-orange-600">Cell Broadcast Mesh Active</span>
                </div>
              </div>

              {/* Language Switcher */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Broadcast Language Preview
                </label>
                <div className="flex gap-2">
                  {['en', 'hi', 'as', 'bn', 'mz'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setSmsLang(l)}
                      className={`px-3 py-1 text-xs rounded-md font-bold uppercase transition-colors cursor-pointer ${
                        smsLang === l
                          ? 'bg-orange-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Content Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  SMS Text Content
                </label>
                <textarea
                  readOnly
                  value={SAMPLE_SMS[smsLang] || SAMPLE_SMS.en}
                  className="w-full h-24 p-3 text-xs bg-orange-50/60 border border-orange-200 rounded-lg text-slate-900 font-sans focus:outline-none"
                />
              </div>

              {/* Audience Size */}
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                <span className="flex items-center font-medium">
                  <Users className="w-4 h-4 text-orange-600 mr-1.5" />
                  Estimated Active Cell Subscribers:
                </span>
                <strong className="text-slate-900 font-mono text-sm">~{recipientsCount.toLocaleString()}</strong>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={isSending}
                  className="flex items-center px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <Radio className="w-4 h-4 mr-1.5 animate-spin" />
                      <span>Broadcasting Telemetry Mesh...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-1.5" />
                      <span>Execute Emergency Cell Broadcast</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Disaster SMS Broadcast Transmitted!
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Emergency alert dispatched to <strong>{recipientsCount.toLocaleString()}</strong> mobile subscribers across {selectedZone.name} via BSNL & Telecom Cell Broadcast.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsSent(false);
                    onClose();
                  }}
                  className="px-5 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
