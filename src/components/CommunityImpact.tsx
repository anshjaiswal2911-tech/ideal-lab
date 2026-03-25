import { motion } from 'motion/react';
import { Map as MapIcon, Users, TrendingUp, Info, ArrowRight, Filter, Layers } from 'lucide-react';
import { View } from '../types';

interface HeatmapProps {
  onNavigate: (view: View) => void;
}

export default function CommunityImpact({ onNavigate }: HeatmapProps) {
  const regions = [
    { name: 'Downtown', score: 85, trend: '+12%', color: 'bg-emerald-500' },
    { name: 'Westside', score: 62, trend: '+5%', color: 'bg-amber-500' },
    { name: 'East End', score: 45, trend: '-2%', color: 'bg-red-500' },
    { name: 'North Park', score: 78, trend: '+8%', color: 'bg-emerald-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Community Impact Heatmap</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
          See where our community is making the biggest difference. We use real-time data from reports and audits to visualize city accessibility.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Heatmap Visualization Simulation */}
        <section className="lg:col-span-2 p-8 rounded-[3rem] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 min-h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <MapIcon size={300} className="text-slate-400" />
          </div>
          
          {/* Simulated Heatmap Blobs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/3 w-48 h-48 bg-emerald-500 rounded-full blur-[60px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500 rounded-full blur-[80px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            className="absolute top-1/2 right-1/2 w-32 h-32 bg-red-500 rounded-full blur-[50px]"
          />

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 shadow-lg">
                <Layers size={16} className="text-brand-500" />
                <span className="text-xs font-bold uppercase tracking-widest">Accessibility Layer</span>
              </div>
              <button className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 shadow-lg hover:text-brand-500 transition-colors">
                <Filter size={18} />
              </button>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-xl max-w-xs">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-500" /> Live Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Total Reports</span>
                  <span className="font-bold">1,284</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Active Audits</span>
                  <span className="font-bold">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">City Score</span>
                  <span className="font-bold text-brand-500">72/100</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Region Breakdown */}
        <section className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Users size={20} className="text-brand-500" /> Region Impact
            </h3>
            <div className="space-y-4">
              {regions.map((region) => (
                <div key={region.name} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">{region.name}</span>
                    <span className={`text-xs font-bold ${region.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                      {region.trend}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${region.score}%` }}
                      className={`h-full ${region.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-600 text-white space-y-4 shadow-xl shadow-indigo-600/20">
            <h3 className="font-bold flex items-center gap-2">
              <Info size={18} /> Help "Cold" Areas
            </h3>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Regions in red need more accessibility reports. Earn double Impact Points by auditing these areas today!
            </p>
            <button 
              onClick={() => onNavigate('map')}
              className="w-full py-3 rounded-xl bg-white text-indigo-600 font-bold text-xs hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
            >
              Find Red Zones <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
