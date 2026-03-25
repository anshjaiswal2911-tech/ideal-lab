import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Map as MapIcon, 
  AlertTriangle, 
  Scan, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Award,
  Bell,
  Heart,
  Wifi,
  Trophy,
  AlertCircle,
  Volume2,
  Activity
} from 'lucide-react';
import { View } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
  userName?: string;
}

export default function Home({ onNavigate, userName }: HomeProps) {
  const { t } = useTranslation();

  const stats = [
    { label: t('stats.reported'), value: '12', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: t('stats.resolved'), value: '8', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: t('stats.points'), value: '450', icon: Award, color: 'text-brand-500', bg: 'bg-brand-500/10' },
    { label: t('stats.rank'), value: '#24', icon: TrendingUp, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  ];

  const recentActivity = [
    { id: 1, title: 'Ramp reported at Broadway', status: 'Pending', time: '2h ago' },
    { id: 2, title: 'Sidewalk audit completed', status: 'Verified', time: 'Yesterday' },
    { id: 3, title: 'Earned "Urban Hero" badge', status: 'New', time: '2 days ago' },
  ];

  const innovativeFeatures = [
    { id: 'sos', title: t('sos'), desc: t('features.sos_desc'), icon: AlertCircle, color: 'bg-red-500', shadow: 'shadow-red-500/20' },
    { id: 'volunteer', title: t('volunteer'), desc: t('features.buddy_desc'), icon: Heart, color: 'bg-pink-500', shadow: 'shadow-pink-500/20' },
    { id: 'iot', title: t('iot'), desc: t('features.iot_desc'), icon: Wifi, color: 'bg-emerald-500', shadow: 'shadow-emerald-500/20' },
    { id: 'challenges', title: t('challenges'), desc: t('features.hero_desc'), icon: Trophy, color: 'bg-amber-500', shadow: 'shadow-amber-500/20' },
    { id: 'voice', title: t('voice'), desc: t('features.voice_desc'), icon: Volume2, color: 'bg-indigo-500', shadow: 'shadow-indigo-500/20' },
    { id: 'impact', title: t('impact'), desc: t('features.impact_desc'), icon: Activity, color: 'bg-brand-500', shadow: 'shadow-brand-500/20' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {t('welcome_back')}, <span className="text-brand-500">{userName || 'User'}</span>!
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Your contributions are making the city more accessible for everyone.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-brand-500 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <button 
              onClick={() => onNavigate('report')}
              className="px-6 py-3 rounded-2xl bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all flex items-center gap-2"
            >
              <AlertTriangle size={18} /> {t('report_issue')}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-3xl p-6 border border-white/20"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Innovative Features Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <ShieldCheck className="text-brand-500" size={28} /> {t('innovative_features')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {innovativeFeatures.map((feature, idx) => (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onNavigate(feature.id as View)}
              className="group p-6 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left hover:shadow-2xl hover:-translate-y-2 transition-all shadow-sm"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} text-white flex items-center justify-center mb-6 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-brand-500 transition-colors">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Tools */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Navigation className="text-brand-500" size={24} /> {t('core_tools')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => onNavigate('map')}
                className="group p-6 rounded-[2rem] bg-brand-500 text-white text-left relative overflow-hidden shadow-xl shadow-brand-500/20 hover:-translate-y-1 transition-all"
              >
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                  <MapIcon size={120} />
                </div>
                <h3 className="text-xl font-bold mb-2">{t('explore_map')}</h3>
                <p className="text-brand-100 text-sm mb-4 max-w-[200px]">{t('explore_map_desc')}</p>
                <div className="flex items-center gap-2 text-sm font-bold">
                  {t('map')} <ArrowRight size={16} />
                </div>
              </button>

              <button 
                onClick={() => onNavigate('audit')}
                className="group p-6 rounded-[2rem] bg-indigo-500 text-white text-left relative overflow-hidden shadow-xl shadow-indigo-500/20 hover:-translate-y-1 transition-all"
              >
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Scan size={120} />
                </div>
                <h3 className="text-xl font-bold mb-2">{t('audit')}</h3>
                <p className="text-indigo-100 text-sm mb-4 max-w-[200px]">{t('ai_audit_desc')}</p>
                <div className="flex items-center gap-2 text-sm font-bold">
                  {t('audit')} <ArrowRight size={16} />
                </div>
              </button>
            </div>
          </section>
        </div>

        {/* Recent Activity Sidebar */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="text-brand-500" size={24} /> {t('recent_activity')}
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold mb-1">{activity.title}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                    activity.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 
                    activity.status === 'New' ? 'bg-brand-500/10 text-brand-500' : 
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
              <button className="w-full py-3 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                {t('view_all')}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
