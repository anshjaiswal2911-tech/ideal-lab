import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, MapPin, Clock, Star, ShieldCheck, Heart, UserPlus, MessageSquare } from 'lucide-react';
import { View } from '../types';

interface VolunteerBuddyProps {
  onNavigate: (view: View) => void;
}

export default function VolunteerBuddy({ onNavigate }: VolunteerBuddyProps) {
  const volunteers = [
    { id: 1, name: 'Sarah Miller', distance: '0.4 km', rating: 4.9, verified: true, active: true },
    { id: 2, name: 'David Chen', distance: '0.8 km', rating: 4.8, verified: true, active: true },
    { id: 3, name: 'Elena Rodriguez', distance: '1.2 km', rating: 5.0, verified: true, active: false },
  ];

  const [requestSent, setRequestSent] = useState(false);
  const [joined, setJoined] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto mb-6">
          <Heart size={32} />
        </div>
        <h1 className="text-4xl font-bold mb-4">Volunteer Buddy System</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Need assistance navigating a complex area or crossing a busy street? Request a verified volunteer "buddy" to help you out.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UserPlus className="text-brand-500" size={24} /> Request Assistance
          </h2>
          <div className="glass rounded-[2rem] p-8 border border-white/20 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Location</label>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800">
                <MapPin size={18} className="text-brand-500" />
                <span className="text-sm font-medium">Central Station, Gate 4</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Type of Help</label>
              <select className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-brand-500">
                <option>Navigation Assistance</option>
                <option>Street Crossing</option>
                <option>Public Transport Help</option>
                <option>General Guidance</option>
              </select>
            </div>
            <button
              onClick={() => {
                setRequestSent(true);
                setTimeout(() => setRequestSent(false), 3000);
              }}
              className="w-full py-4 rounded-2xl bg-brand-500 text-white font-bold shadow-xl shadow-brand-500/20 hover:bg-brand-600 transition-all"
            >
              {requestSent ? "Request Broadcasted! ✓" : "Broadcast Request"}
            </button>
            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
              <ShieldCheck size={12} className="inline mr-1" /> All volunteers are background checked
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="text-brand-500" size={24} /> Nearby Volunteers
          </h2>
          <div className="space-y-4">
            {volunteers.map((v) => (
              <motion.div
                key={v.id}
                whileHover={{ x: 10 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={`https://picsum.photos/seed/vol${v.id}/100/100`}
                      alt={v.name}
                      className="w-12 h-12 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {v.active && (
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-1">
                      {v.name} {v.verified && <ShieldCheck size={12} className="text-brand-500" />}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                      <span className="flex items-center gap-1"><MapPin size={10} /> {v.distance}</span>
                      <span className="flex items-center gap-1 text-amber-500"><Star size={10} fill="currentColor" /> {v.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-brand-500 transition-colors">
                  <MessageSquare size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Community Impact */}
      <div className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-brand-600 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <h3 className="text-2xl font-bold mb-2">Become a Volunteer</h3>
          <p className="text-indigo-100 text-sm">
            Join our network of 5,000+ citizens helping make the city accessible. Earn impact points and badges for every assistance provided.
          </p>
        </div>
        <button
          onClick={() => setJoined(true)}
          disabled={joined}
          className="px-8 py-4 rounded-2xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-all whitespace-nowrap disabled:opacity-50"
        >
          {joined ? "Welcome to the Network! 🎉" : "Join the Network"}
        </button>
      </div>
    </div>
  );
}
