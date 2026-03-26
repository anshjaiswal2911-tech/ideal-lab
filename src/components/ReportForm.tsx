import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, MapPin, Send, CheckCircle2, AlertCircle, Upload, X } from 'lucide-react';
import { Issue } from '../types';
import { cn } from '../lib/utils';

interface ReportFormProps {
  onReport: (issue: Issue) => void;
  API_URL: string;
}

export default function ReportForm({ onReport, API_URL }: ReportFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: 'broken-footpath' as Issue['type'],
    severity: 'medium' as Issue['severity'],
    address: '',
    description: '',
    image: null as string | null,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/issues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.type,
          severity: formData.severity,
          location: { lat: 40.7128, lng: -74.0060, address: formData.address || 'Current Location' },
          description: formData.description,
          image: formData.image || undefined,
        }),
      });

      if (response.ok) {
        const newIssue = await response.json();
        onReport(newIssue);
        setIsSuccess(true);
        // Reset form
        setFormData({
          type: 'broken-footpath',
          severity: 'medium',
          address: '',
          description: '',
          image: null,
        });
      }
    } catch (error) {
      console.error('Failed to submit report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Report Accessibility Issue</h2>
        <p className="text-slate-500 dark:text-slate-400">Help us identify barriers and improve urban infrastructure for everyone.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <motion.form
            onSubmit={handleSubmit}
            className="glass rounded-[2.5rem] p-8 shadow-xl border border-white/10 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Issue Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Issue['type'] }))}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                >
                  <option value="broken-footpath">Broken Footpath</option>
                  <option value="no-ramp">Missing Ramp</option>
                  <option value="no-tactile">No Tactile Paving</option>
                  <option value="no-audio-signal">No Audio Signal</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Severity Level</label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, severity: s }))}
                      className={cn(
                        "flex-1 py-3 rounded-2xl text-xs font-bold capitalize transition-all",
                        formData.severity === s
                          ? s === 'high' ? "bg-red-500 text-white shadow-lg shadow-red-500/20" :
                            s === 'medium' ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/20" :
                              "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Enter address or use GPS"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-brand-500/10 text-brand-500 text-[10px] font-bold hover:bg-brand-500/20 transition-colors"
                >
                  USE GPS
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Description</label>
              <textarea
                placeholder="Describe the issue in detail..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-brand-500 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-xl",
                isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600 shadow-brand-500/30 hover:-translate-y-1"
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Report
                </>
              )}
            </button>
          </motion.form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-[2.5rem] p-8 shadow-xl border border-white/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Camera size={20} className="text-brand-500" />
              Upload Evidence
            </h3>
            <div className="relative group">
              {formData.image ? (
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-800">
                  <img src={formData.image} alt="Upload preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg hover:scale-110 transition-transform"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:bg-brand-500/5 transition-all cursor-pointer">
                  <Upload size={40} className="text-slate-300 mb-4 group-hover:text-brand-500 transition-colors" />
                  <p className="text-sm font-bold text-slate-500 group-hover:text-brand-500 transition-colors">Click to upload photo</p>
                  <p className="text-[10px] text-slate-400 mt-1">JPG, PNG up to 5MB</p>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          <div className="p-6 rounded-[2rem] bg-indigo-500 text-white shadow-xl shadow-indigo-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <AlertCircle size={20} />
              </div>
              <h3 className="font-bold">Why Report?</h3>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Your reports are directly sent to city authorities and urban planners. Every report helps us prioritize infrastructure projects and makes the city safer for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md glass rounded-[2.5rem] p-10 text-center shadow-2xl border border-white/20"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Report Submitted!</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Thank you for your contribution. Authorities have been notified and you can track the status in the dashboard.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="w-full py-4 rounded-2xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
