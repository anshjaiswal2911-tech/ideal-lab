import { motion } from 'motion/react';
import { Mic, Volume2, Navigation, MapPin, AlertTriangle, ArrowRight, Play, Square, Info } from 'lucide-react';
import { View } from '../types';
import { useState, useEffect } from 'react';

interface VoiceNavProps {
  onNavigate: (view: View) => void;
}

export default function VoiceNav({ onNavigate }: VoiceNavProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentCue, setCurrentCue] = useState('Press Start to begin voice-guided navigation.');

  const cues = [
    "Starting navigation to Central Park.",
    "Walk forward for 50 meters.",
    "Caution: Uneven pavement detected ahead. Stay to the right.",
    "Approaching intersection. Audio signal is operational.",
    "Turn left in 10 meters.",
    "You have reached your destination. Accessible entrance is on your right."
  ];

  useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout;

    if (isActive) {
      setCurrentCue(cues[0]);
      timer = setInterval(() => {
        index = (index + 1) % cues.length;
        setCurrentCue(cues[index]);
      }, 4000);
    } else {
      setCurrentCue('Press Start to begin voice-guided navigation.');
    }

    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto mb-6">
          <Volume2 size={32} />
        </div>
        <h1 className="text-4xl font-bold mb-4">Voice-Guided Navigation</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Experience our AI-powered audio navigation designed for visually impaired users. Real-time obstacle detection and turn-by-turn guidance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Simulation View */}
        <section className="p-8 rounded-[3rem] bg-slate-900 text-white flex flex-col items-center justify-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/20 via-transparent to-transparent animate-pulse"></div>
          </div>

          <div className="relative z-10 text-center space-y-6">
            <motion.div
              animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${
                isActive ? 'bg-brand-500 shadow-xl shadow-brand-500/40' : 'bg-slate-800'
              }`}
            >
              {isActive ? <Volume2 size={40} /> : <Mic size={40} className="text-slate-500" />}
            </motion.div>
            
            <div className="min-h-[80px] flex items-center justify-center px-4">
              <motion.p 
                key={currentCue}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium leading-relaxed"
              >
                "{currentCue}"
              </motion.p>
            </div>

            <div className="flex items-center gap-4 justify-center">
              {!isActive ? (
                <button 
                  onClick={() => setIsActive(true)}
                  className="px-8 py-4 rounded-2xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-all flex items-center gap-2"
                >
                  <Play size={20} /> Start Simulation
                </button>
              ) : (
                <button 
                  onClick={() => setIsActive(false)}
                  className="px-8 py-4 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all flex items-center gap-2"
                >
                  <Square size={20} /> Stop
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Features Info */}
        <section className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Info size={14} className="text-brand-500" /> How it works
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center mt-0.5 shrink-0">
                  <span className="text-[10px] font-bold">1</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Uses computer vision to detect obstacles like poles, potholes, and uneven surfaces.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center mt-0.5 shrink-0">
                  <span className="text-[10px] font-bold">2</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Integrates with smart traffic signals to provide audio crossing cues.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center mt-0.5 shrink-0">
                  <span className="text-[10px] font-bold">3</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Provides haptic feedback through the smartphone for critical alerts.</p>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-brand-500 text-white space-y-4 shadow-xl shadow-brand-500/20">
            <h3 className="font-bold flex items-center gap-2">
              <Navigation size={18} /> Smart Route Integration
            </h3>
            <p className="text-sm text-brand-50 leading-relaxed">
              This feature works seamlessly with our Route Planner to ensure you take the safest and most accessible path available.
            </p>
            <button 
              onClick={() => onNavigate('route')}
              className="w-full py-3 rounded-xl bg-white text-brand-500 font-bold text-xs hover:bg-brand-50 transition-all flex items-center justify-center gap-2"
            >
              Go to Route Planner <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
