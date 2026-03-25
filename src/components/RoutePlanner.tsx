import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation, MapPin, ArrowRight, Info, ShieldCheck, Clock, Accessibility } from 'lucide-react';
import { cn } from '../lib/utils';

export default function RoutePlanner() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [route, setRoute] = useState<any>(null);

  const calculateRoute = (e: FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setRoute(null);

    // Simulate calculation
    setTimeout(() => {
      setRoute({
        distance: '2.4 km',
        time: '18 min',
        safetyScore: 92,
        features: [
          '100% Ramp Coverage',
          'Tactile Paving Available',
          'Audio Signals at all Crossings',
          'Low Traffic Density'
        ],
        steps: [
          'Head North on Broadway (Accessible)',
          'Turn left at 5th St (Tactile Paving)',
          'Cross at Sector 4 (Smart Signal)',
          'Arrive at Destination'
        ]
      });
      setIsCalculating(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Smart Route Suggestion</h2>
        <p className="text-slate-500 dark:text-slate-400">Find the most accessible and barrier-free path to your destination.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={calculateRoute} className="glass rounded-[2.5rem] p-8 shadow-xl border border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Start Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Current Location" 
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <ArrowRight size={16} className="rotate-90" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">End Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Destination" 
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isCalculating}
              className={cn(
                "w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-xl",
                isCalculating ? "bg-slate-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600 shadow-brand-500/30 hover:-translate-y-1"
              )}
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Navigation size={20} />
                  Find Accessible Route
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-6 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                <Info size={16} />
              </div>
              <h4 className="font-bold text-sm">Pro Tip</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our algorithm prioritizes routes with tactile paving and audio signals, even if they are slightly longer, to ensure maximum safety and independence.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {!route && !isCalculating ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
              >
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 mb-6">
                  <Navigation size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to Navigate?</h3>
                <p className="text-sm text-slate-500 max-w-xs">Enter your start and end locations to see the most accessible route suggested by our AI.</p>
              </motion.div>
            ) : isCalculating ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-[3rem]"
              >
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-4 border-brand-500/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-brand-500">
                    <Navigation size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Analyzing Urban Grid</h3>
                <p className="text-sm text-slate-500">Checking ramp availability and signal status...</p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="glass rounded-[3rem] p-8 shadow-xl border border-white/10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold mb-2">
                        <ShieldCheck size={12} />
                        MOST ACCESSIBLE ROUTE
                      </div>
                      <h3 className="text-2xl font-bold">Route Summary</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-display font-bold text-brand-500">{route.safetyScore}%</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safety Score</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-brand-500 shadow-sm">
                        <Navigation size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Distance</p>
                        <p className="font-bold">{route.distance}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-brand-500 shadow-sm">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Est. Time</p>
                        <p className="font-bold">{route.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Route Highlights</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {route.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass rounded-[3rem] p-8 shadow-xl border border-white/10">
                  <h4 className="font-bold mb-6 flex items-center gap-2">
                    <Accessibility size={20} className="text-brand-500" />
                    Turn-by-Turn Navigation
                  </h4>
                  <div className="space-y-6 relative">
                    <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-200 dark:border-slate-800 border-dashed border-l" />
                    {route.steps.map((step: string, i: number) => (
                      <div key={i} className="flex items-start gap-6 relative z-10">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md",
                          i === 0 ? "bg-brand-500 text-white" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        )}>
                          {i + 1}
                        </div>
                        <p className="text-sm font-medium pt-1.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
