import React, { useState } from 'react';
import { X, Camera, MapPin, CheckCircle, Upload } from 'lucide-react';

export default function NewReportModal({ isOpen, onClose, selectedZone, onAddReport }) {
  if (!isOpen) return null;

  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Fresh Tension Cracks & Slope Movement');
  const [crackWidthCm, setCrackWidthCm] = useState('12.5');
  const [location, setLocation] = useState(`${selectedZone.name} Slope Stretch`);
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1596489911771-ef627cf9f33b?auto=format&fit=crop&w=600&q=80');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newRep = {
      id: `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      author: author || 'Anonymous Field Observer',
      location: location,
      lat: selectedZone.center[0] + (Math.random() - 0.5) * 0.02,
      lng: selectedZone.center[1] + (Math.random() - 0.5) * 0.02,
      timestamp: 'Just now',
      category: category,
      crackWidthCm: parseFloat(crackWidthCm) || 10.0,
      photoUrl: photoUrl,
      verified: false,
      verificationSource: 'Pending Field Verification',
      inSarData: {
        displacementRateYear: '-38 mm/yr',
        coherenceIndex: 0.85,
        interferogramFringe: 'Phase Deformation Shift',
        satellitePass: 'Sentinel-1A'
      }
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onAddReport(newRep);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-orange-600 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-white" />
            <h2 className="text-base font-bold tracking-tight">
              Submit Citizen / Field Hazard Report
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-orange-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 text-xs">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Reporter Name / Designation
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sonam Lepcha (Gram Sevak)"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hazard Classification
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option>Fresh Tension Cracks & Slope Movement</option>
                  <option>Subsurface Seepage & Mud Flow</option>
                  <option>Retaining Wall Bulge / Shear Failure</option>
                  <option>Active Debris Slide & Highway Blockage</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Crack Width (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={crackWidthCm}
                    onChange={(e) => setCrackWidthCm(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    GPS Geotag
                  </label>
                  <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-lg font-mono text-[11px] text-slate-600 truncate">
                    {selectedZone.center[0].toFixed(3)}, {selectedZone.center[1].toFixed(3)}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location Landmark
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hazard Photo Evidence (URL or Demo Upload)
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-mono text-slate-600 focus:outline-none"
                  />
                  <img src={photoUrl} alt="Preview" className="w-9 h-9 rounded object-cover border border-slate-300 shrink-0" />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-4 py-2 font-bold bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Ingesting Report..." : "Submit Geotagged Report"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Citizen Geotag Report Ingested!
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Report logged into local cache & pushed to GeoRisk Sentinel GIS telemetry queue.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    onClose();
                  }}
                  className="px-5 py-2 font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
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
