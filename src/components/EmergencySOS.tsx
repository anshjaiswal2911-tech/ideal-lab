import { motion } from 'motion/react';
import { AlertCircle, MapPin, Phone, ShieldCheck, Clock, Users, Bell, X, Heart, Navigation } from 'lucide-react';
import { View } from '../types';
import { useState, useEffect } from 'react';

interface EmergencySOSProps {
  onNavigate: (view: View) => void;
}

export default function EmergencySOS({ onNavigate }: EmergencySOSProps) {
  const [isAlerting, setIsAlerting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAlerting && countdown > 0 && !alertSent) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isAlerting && countdown === 0 && !alertSent) {
      setAlertSent(true);
    }
    return () => clearTimeout(timer);
  }, [isAlerting, countdown, alertSent]);

  const handleSOS = () => {
    setIsAlerting(true);
    setCountdown(5);
  };

  const cancelSOS = () => {
    setIsAlerting(false);
    setCountdown(5);
    setAlertSent(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-8 animate-pulse">
          <AlertCircle size={48} />
        </div>
        <h1 className="text-4xl font-bold mb-4">Emergency Assistance</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Need immediate help? Trigger an SOS to alert nearby volunteers, emergency services, and your designated emergency contacts.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* SOS Button Section */}
        <section className="flex flex-col items-center justify-center p-12 rounded-[3rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl relative overflow-hidden">
          {isAlerting && !alertSent ? (
            <div className="text-center space-y-8 relative z-10">
              <div className="w-32 h-32 rounded-full border-8 border-red-500/20 flex items-center justify-center mx-auto relative">
                <div className="absolute inset-0 rounded-full border-8 border-red-500 border-t-transparent animate-spin"></div>
                <span className="text-5xl font-bold text-red-500">{countdown}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-500 mb-2">Sending SOS...</h3>
                <p className="text-sm text-slate-500">Alerting emergency services and nearby volunteers in {countdown} seconds.</p>
              </div>
              <button
                onClick={cancelSOS}
                className="px-8 py-4 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-200 transition-all flex items-center gap-2 mx-auto"
              >
                <X size={20} /> Cancel SOS
              </button>
            </div>
          ) : isAlerting && alertSent ? (
            <div className="text-center space-y-8 relative z-10">
              <div className="w-32 h-32 rounded-full bg-red-500/10 flex items-center justify-center mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/20 animate-ping rounded-full"></div>
                <ShieldCheck size={64} className="text-red-500 relative z-10" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-red-500 mb-2">SOS ALERT SENT</h3>
                <p className="text-sm text-slate-500 font-medium">Emergency services and verified volunteers have been dispatched to your location.</p>
              </div>
              <button
                onClick={cancelSOS}
                className="px-8 py-4 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-200 transition-all flex items-center gap-2 mx-auto"
              >
                <X size={20} /> End Emergency State
              </button>
            </div>
          ) : (
            <div className="text-center space-y-8 relative z-10">
              <button
                onClick={handleSOS}
                className="w-48 h-48 rounded-full bg-red-500 text-white flex flex-col items-center justify-center gap-2 shadow-2xl shadow-red-500/40 hover:scale-105 active:scale-95 transition-all group"
              >
                <Bell size={48} className="group-hover:animate-bounce" />
                <span className="text-2xl font-bold uppercase tracking-widest">SOS</span>
              </button>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Press and hold for 3 seconds</p>
            </div>
          )}

          {/* Background Pulse */}
          {isAlerting && (
            <div className="absolute inset-0 bg-red-500/5 animate-pulse -z-10"></div>
          )}
        </section>

        {/* Emergency Info Section */}
        <section className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <MapPin size={14} className="text-brand-500" /> Your Location
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">Broadway St. & 5th Ave</p>
                <p className="text-xs text-slate-500">40.7128° N, 74.0060° W</p>
              </div>
              <button className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm text-brand-500">
                <Navigation size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Users size={14} className="text-brand-500" /> Emergency Contacts
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                    <Heart size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Jane Doe (Wife)</p>
                    <p className="text-[10px] text-slate-500">+1 234 567 890</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500">
                  <Phone size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Local Police Station</p>
                    <p className="text-[10px] text-slate-500">911 / 100</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500">
                  <Phone size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Nearby Volunteers Alert */}
      <div className="p-8 rounded-[2rem] bg-slate-900 text-white flex items-center justify-between gap-8 shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Users size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Nearby Volunteers</h3>
            <p className="text-slate-400 text-sm">There are 12 verified volunteers within 500 meters of your location.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-emerald-500 font-bold">
          <Clock size={18} /> 2m Response Time
        </div>
      </div>
    </div>
  );
}
