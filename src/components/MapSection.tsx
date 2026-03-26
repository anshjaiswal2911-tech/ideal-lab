import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Info, Filter, Search, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Issue } from '../types';
import { cn } from '../lib/utils';

interface MapSectionProps {
  issues: Issue[];
}

export default function MapSection({ issues }: MapSectionProps) {
  const [selectedMarker, setSelectedMarker] = useState<Issue | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  const filteredIssues = issues.filter(i => filter === 'all' || i.status === filter);

  return (
    <div className="h-[calc(100vh-64px)] relative flex flex-col md:flex-row">
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 glass border-r border-white/10 p-6 z-10 flex flex-col gap-6 overflow-y-auto">
        <div>
          <h2 className="text-2xl font-bold mb-2">Accessibility Map</h2>
          <p className="text-xs text-slate-500">Real-time infrastructure monitoring</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Filters</p>
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'resolved'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all",
                  filter === f
                    ? "bg-brand-500 text-white shadow-md"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Reports</p>
          <div className="space-y-3">
            {filteredIssues.slice(0, 5).map(issue => (
              <div
                key={issue.id}
                onClick={() => setSelectedMarker(issue)}
                className={cn(
                  "p-3 rounded-xl border cursor-pointer transition-all",
                  selectedMarker?.id === issue.id
                    ? "bg-brand-500/10 border-brand-500/30"
                    : "bg-white/50 dark:bg-slate-800/50 border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                    issue.severity === 'high' ? "bg-red-500/20 text-red-600" :
                      issue.severity === 'medium' ? "bg-yellow-500/20 text-yellow-600" :
                        "bg-blue-500/20 text-blue-600"
                  )}>
                    {issue.severity}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(issue.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm font-bold truncate">{issue.location.address}</p>
                <p className="text-xs text-slate-500 truncate capitalize">{issue.type.replace('-', ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative bg-slate-200 dark:bg-slate-900 overflow-hidden">
        {/* Fake Map Background */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400 dark:text-slate-600" />
              </pattern>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-slate-300 dark:text-slate-700" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Styled "Streets" */}
            <path d="M 0 120 L 2000 120 M 0 450 L 2000 450 M 300 0 L 300 1000 M 800 0 L 800 1000" stroke="currentColor" strokeWidth="2" className="text-slate-300/50 dark:text-slate-700/50" />
          </svg>
        </div>

        {/* Markers */}
        {filteredIssues.map(issue => (
          <motion.button
            key={issue.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setSelectedMarker(issue)}
            className="absolute z-10"
            style={{
              left: `${(issue.location.lng + 74.01) * 5000 % 80 + 10}%`,
              top: `${(issue.location.lat - 40.71) * 5000 % 80 + 10}%`
            }}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-slate-900",
              issue.status === 'resolved' ? "bg-emerald-500" :
                issue.severity === 'high' ? "bg-red-500 animate-pulse" :
                  issue.severity === 'medium' ? "bg-yellow-500" : "bg-blue-500"
            )}>
              {issue.status === 'resolved' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            </div>
          </motion.button>
        ))}

        {/* Marker Detail Popup */}
        <AnimatePresence>
          {selectedMarker && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm glass rounded-3xl p-6 shadow-2xl z-20"
            >
              <button
                onClick={() => setSelectedMarker(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <MapPin size={20} />
              </button>

              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                  <img
                    src={`https://picsum.photos/seed/${selectedMarker.id}/200/200`}
                    alt="Issue"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                      selectedMarker.status === 'resolved' ? "bg-emerald-500/20 text-emerald-600" : "bg-orange-500/20 text-orange-600"
                    )}>
                      {selectedMarker.status}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-slate-100 dark:bg-slate-800">
                      {selectedMarker.severity} severity
                    </span>
                  </div>
                  <h3 className="font-bold text-lg leading-tight">{selectedMarker.location.address}</h3>
                  <p className="text-xs text-slate-500 capitalize">{selectedMarker.type.replace('-', ' ')}</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs leading-relaxed">
                  <p className="font-semibold mb-1 flex items-center gap-1">
                    <Info size={12} /> Description
                  </p>
                  {selectedMarker.description}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <Clock size={12} /> Reported {new Date(selectedMarker.timestamp).toLocaleTimeString()}
                  </div>
                  <button className="text-xs font-bold text-brand-500 hover:underline">
                    View Full Details
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="absolute top-6 right-6 glass p-4 rounded-2xl shadow-lg space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Legend</p>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Accessible / Resolved</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>High Severity Issue</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Under Improvement</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>General Report</span>
          </div>
        </div>
      </div>
    </div>
  );
}
