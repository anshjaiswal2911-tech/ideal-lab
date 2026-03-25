import { motion } from 'motion/react';
import { Award, Trophy, Star, Target, Zap, ShieldCheck, CheckCircle2, TrendingUp, Users, Heart } from 'lucide-react';
import { View } from '../types';

interface ChallengesProps {
  onNavigate: (view: View) => void;
}

export default function Challenges({ onNavigate }: ChallengesProps) {
  const challenges = [
    { id: 1, title: 'Sidewalk Scout', desc: 'Report 5 broken footpaths in your neighborhood.', progress: 3, total: 5, points: 100, icon: Target, color: 'text-brand-500', bg: 'bg-brand-500/10' },
    { id: 2, title: 'Ramp Reviewer', desc: 'Verify 3 newly installed ramps for accessibility.', progress: 1, total: 3, points: 150, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 3, title: 'Urban Buddy', desc: 'Provide assistance to 2 citizens using the Buddy System.', progress: 0, total: 2, points: 200, icon: Heart, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 4, title: 'Map Master', desc: 'Add 10 accessibility photos to the GIS map.', progress: 7, total: 10, points: 250, icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const badges = [
    { name: 'Urban Hero', icon: ShieldCheck, color: 'text-brand-500', earned: true },
    { name: 'Accessibility Pro', icon: Trophy, color: 'text-amber-500', earned: true },
    { name: 'Top Contributor', icon: Award, color: 'text-indigo-500', earned: false },
    { name: 'Fast Responder', icon: Zap, color: 'text-emerald-500', earned: false },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-6 border border-amber-500/20">
            <Trophy size={16} />
            <span>Gamified Impact</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Urban Hero Challenges</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Complete challenges, earn points, and unlock badges while making your city more accessible for everyone.
          </p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* User Profile Card */}
        <div className="lg:col-span-1">
          <div className="glass rounded-[2rem] p-8 border border-white/20 shadow-xl sticky top-24">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <img 
                  src="https://picsum.photos/seed/user/200/200" 
                  alt="User" 
                  className="w-24 h-24 rounded-3xl object-cover border-4 border-brand-500/20"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-lg">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Level 12 Urban Hero</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>Experience Points</span>
                  <span>450 / 1000 XP</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-brand-500 w-[45%] rounded-full shadow-lg shadow-brand-500/20"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-lg font-bold">1,240</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Rank</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-lg font-bold">450</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Impact Points</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Award size={16} className="text-brand-500" /> Recent Badges
                </h3>
                <div className="flex flex-wrap gap-3">
                  {badges.map((badge, idx) => (
                    <div 
                      key={badge.name} 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border ${
                        badge.earned ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ' + badge.color : 'bg-slate-100 dark:bg-slate-800/30 border-dashed border-slate-300 dark:border-slate-700 text-slate-300'
                      }`}
                      title={badge.name}
                    >
                      <badge.icon size={24} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Challenges List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
            <Target className="text-brand-500" size={28} /> Active Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((c, idx) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${c.bg} ${c.color} flex items-center justify-center`}>
                    <c.icon size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-brand-500">+{c.points} XP</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reward</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-brand-500 transition-colors">{c.title}</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{c.desc}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span>Progress</span>
                    <span>{c.progress} / {c.total}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(c.progress / c.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full ${c.color.replace('text-', 'bg-')} rounded-full shadow-sm`}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Leaderboard Suggestion */}
          <div className="p-8 rounded-[2rem] bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-between gap-8 shadow-xl">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                <TrendingUp size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">City Leaderboard</h3>
                <p className="text-slate-400 text-sm">See how you rank against other contributors in your city.</p>
              </div>
            </div>
            <button className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-all whitespace-nowrap">
              View Rankings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
