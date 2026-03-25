import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, ShieldCheck, AlertTriangle, CheckCircle2, Info, Zap, Search } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AIAudit() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setShowResults(false);
  };

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setShowResults(true);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6 border border-indigo-500/20">
            <Zap size={16} />
            <span>AI-Powered Infrastructure Analysis</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Real-time <span className="text-indigo-500">Accessibility</span> Audit
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Our advanced AI vision system scans urban environments to identify accessibility barriers, calculate safety scores, and provide data-driven recommendations for city planners.
          </p>

          <div className="space-y-4 mb-10">
            {[
              "Automated barrier detection",
              "Safety score calculation",
              "Compliance monitoring (ADA/local standards)",
              "Predictive maintenance suggestions"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={startScan}
            disabled={isScanning}
            className={cn(
              "px-10 py-5 rounded-[2rem] font-bold text-white transition-all flex items-center gap-3 shadow-2xl",
              isScanning ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/30 hover:-translate-y-1"
            )}
          >
            {isScanning ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Scanning Environment...
              </>
            ) : (
              <>
                <Scan size={24} />
                Start AI Audit
              </>
            )}
          </button>
        </div>

        <div className="relative">
          {/* Scanning UI */}
          <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden glass border border-white/20 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/streetview/800/600" 
              alt="Street View" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Scanning Line */}
            {isScanning && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)] animate-scan" />
                <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-[1px]" />
                
                {/* Random Detection Boxes */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute top-1/4 left-1/3 w-32 h-20 border-2 border-red-500 rounded-lg"
                >
                  <span className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">BARRIER_DETECTED</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-1/3 right-1/4 w-40 h-24 border-2 border-emerald-500 rounded-lg"
                >
                  <span className="absolute -top-6 left-0 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">RAMP_COMPLIANT</span>
                </motion.div>
              </div>
            )}

            {/* Progress Overlay */}
            {isScanning && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-sm">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-white/10"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={364.4}
                      strokeDashoffset={364.4 - (364.4 * progress) / 100}
                      className="text-indigo-500 transition-all duration-100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-white">{progress}%</span>
                  </div>
                </div>
                <p className="mt-4 text-white font-bold tracking-widest text-xs uppercase">Processing Frames...</p>
              </div>
            )}

            {/* Results Overlay */}
            <AnimatePresence>
              {showResults && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-40 p-8 flex flex-col justify-between bg-slate-950/80 backdrop-blur-md text-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Audit Complete</h3>
                      <p className="text-xs opacity-60">Location: 5th Avenue, Sector 4</p>
                    </div>
                    <div className="px-4 py-2 rounded-2xl bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold">
                      HIGH RISK AREA
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-[10px] opacity-60 uppercase mb-1">Accessibility Score</p>
                      <p className="text-3xl font-display font-bold text-brand-500">42%</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-[10px] opacity-60 uppercase mb-1">Barriers Found</p>
                      <p className="text-3xl font-display font-bold text-red-500">07</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider opacity-60">AI Recommendations</p>
                    <div className="space-y-2">
                      {[
                        "Install tactile paving at the crossing",
                        "Repair 12m of broken footpath",
                        "Add audio signals to traffic lights"
                      ].map((rec, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-xs">
                          <div className="w-2 h-2 rounded-full bg-indigo-500" />
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowResults(false)}
                    className="mt-6 w-full py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-colors"
                  >
                    Dismiss Results
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Background Glow */}
          <div className="absolute -inset-10 bg-indigo-500/20 blur-[100px] -z-10" />
        </div>
      </div>
    </div>
  );
}
