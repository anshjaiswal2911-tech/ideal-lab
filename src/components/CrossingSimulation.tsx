import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity as TrafficLight, Volume2, Timer, Accessibility, CheckCircle2, AlertCircle } from 'lucide-react';
import { AccessibilityMode } from '../types';
import { cn } from '../lib/utils';

interface CrossingSimulationProps {
  accMode: AccessibilityMode;
}

export default function CrossingSimulation({ accMode }: CrossingSimulationProps) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [status, setStatus] = useState<'stop' | 'go'>('stop');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setStatus(s => s === 'stop' ? 'go' : 'stop');
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const playVoiceAlert = () => {
    setIsVoiceActive(true);

    // Play actual audio using browser speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const message = status === 'stop'
        ? 'Wait to cross. The light is red.'
        : 'Smart crossing active. Safe to cross now.';
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => setIsVoiceActive(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Smart Crossing Simulation</h2>
        <p className="text-slate-500 dark:text-slate-400">IoT-enabled pedestrian signals with adaptive accessibility features.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Signal UI */}
        <div className="flex flex-col items-center">
          <div className="w-48 p-6 rounded-[3rem] bg-slate-900 shadow-2xl border-4 border-slate-800 flex flex-col gap-6 items-center">
            {/* Red Light */}
            <div className={cn(
              "w-24 h-24 rounded-full transition-all duration-500 flex items-center justify-center",
              status === 'stop'
                ? "bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.6)]"
                : "bg-red-950 opacity-20"
            )}>
              {status === 'stop' && <AlertCircle size={48} className="text-white" />}
            </div>

            {/* Green Light */}
            <div className={cn(
              "w-24 h-24 rounded-full transition-all duration-500 flex items-center justify-center",
              status === 'go'
                ? "bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.6)]"
                : "bg-emerald-950 opacity-20"
            )}>
              {status === 'go' && <CheckCircle2 size={48} className="text-white" />}
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 font-display font-bold text-3xl">
              <Timer className="text-brand-500" />
              {timeLeft}s
            </div>
            <p className="mt-4 font-bold text-xl uppercase tracking-widest">
              {status === 'stop' ? (
                <span className="text-red-500">Wait to Cross</span>
              ) : (
                <span className="text-emerald-500">Safe to Cross</span>
              )}
            </p>
          </div>
        </div>

        {/* Controls & Info */}
        <div className="space-y-8">
          <div className="glass rounded-[2.5rem] p-8 shadow-xl border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Accessibility size={24} className="text-brand-500" />
              Adaptive Features
            </h3>

            <div className="space-y-4">
              <div className={cn(
                "p-4 rounded-2xl border transition-all",
                accMode.largeText ? "bg-brand-500/10 border-brand-500/30" : "bg-slate-50 dark:bg-slate-800/50 border-transparent"
              )}>
                <p className="text-xs font-bold mb-1">Visual Assistance</p>
                <p className={cn("text-sm opacity-70", accMode.largeText ? "text-lg font-bold" : "text-sm")}>
                  High-contrast, oversized indicators for low-vision users.
                </p>
              </div>

              <div className={cn(
                "p-4 rounded-2xl border transition-all",
                isVoiceActive ? "bg-indigo-500/10 border-indigo-500/30" : "bg-slate-50 dark:bg-slate-800/50 border-transparent"
              )}>
                <p className="text-xs font-bold mb-1">Audio Assistance</p>
                <p className="text-sm opacity-70 mb-3">
                  Voice alerts and haptic feedback for blind pedestrians.
                </p>
                <button
                  onClick={playVoiceAlert}
                  className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 hover:bg-indigo-600 transition-colors"
                >
                  <Volume2 size={14} />
                  Simulate Voice Alert
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-brand-500 text-white shadow-xl shadow-brand-500/20">
            <h3 className="text-lg font-bold mb-2">How it works</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Smart crossings use IoT sensors to detect pedestrians with mobility aids. The system automatically extends the "Green" time and activates audio-visual aids when an accessibility device is nearby.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
