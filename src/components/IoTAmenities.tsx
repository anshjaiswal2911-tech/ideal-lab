import { motion } from 'motion/react';
import { 
  Wifi, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Wind, 
  Thermometer, 
  Accessibility,
  Building2,
  AlertTriangle
} from 'lucide-react';
import { View } from '../types';

interface IoTAmenitiesProps {
  onNavigate: (view: View) => void;
}

export default function IoTAmenities({ onNavigate }: IoTAmenitiesProps) {
  const amenities = [
    { id: 1, name: 'Accessible Lift - North Gate', location: 'Central Station', status: 'Operational', lastUpdate: '2m ago', type: 'Lift' },
    { id: 2, name: 'Accessible Toilet - Block A', location: 'City Park', status: 'Under Maintenance', lastUpdate: '15m ago', type: 'Toilet' },
    { id: 3, name: 'Tactile Paving Path - East Wing', location: 'Public Library', status: 'Operational', lastUpdate: '1h ago', type: 'Path' },
    { id: 4, name: 'Audio Signal - Crossing 4', location: 'Main St & 5th Ave', status: 'Operational', lastUpdate: '5m ago', type: 'Signal' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-4 border border-brand-500/20">
            <Wifi size={16} />
            <span>Real-time IoT Monitoring</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Smart Amenity Tracker</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Live status of accessible infrastructure across the city.
          </p>
        </motion.div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-brand-500 transition-colors font-bold text-sm">
          <RefreshCw size={18} /> Refresh Data
        </button>
      </header>

      {/* Environmental Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Thermometer size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Temperature</p>
            <p className="text-xl font-bold">24°C</p>
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Wind size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Air Quality</p>
            <p className="text-xl font-bold">Good (AQI 42)</p>
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <Accessibility size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accessibility Score</p>
            <p className="text-xl font-bold">92%</p>
          </div>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {amenities.map((a, idx) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  a.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {a.type === 'Lift' ? <Building2 size={28} /> : 
                   a.type === 'Toilet' ? <Accessibility size={28} /> : 
                   a.type === 'Signal' ? <Wifi size={28} /> : <MapPin size={28} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold group-hover:text-brand-500 transition-colors">{a.name}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={14} /> {a.location}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${
                a.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {a.status === 'Operational' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                {a.status}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <Clock size={12} /> Updated {a.lastUpdate}
              </div>
              {a.status !== 'Operational' && (
                <button className="text-[10px] font-bold text-brand-500 uppercase tracking-widest hover:underline flex items-center gap-1">
                  <AlertTriangle size={12} /> Report Issue
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map Integration Suggestion */}
      <div className="mt-12 p-8 rounded-[2rem] bg-slate-900 dark:bg-brand-500/10 border border-brand-500/20 text-center">
        <h3 className="text-xl font-bold mb-4 text-white">View on Interactive Map</h3>
        <p className="text-slate-400 dark:text-slate-300 mb-8 max-w-xl mx-auto">
          See all smart amenities on our real-time GIS map to plan your journey with confidence.
        </p>
        <button 
          onClick={() => onNavigate('map')}
          className="px-8 py-4 rounded-2xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20"
        >
          Open Smart Map
        </button>
      </div>
    </div>
  );
}
