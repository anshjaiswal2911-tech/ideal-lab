import { motion } from 'motion/react';
import { Map as MapIcon, AlertTriangle, Scan, ArrowRight, ShieldCheck, Users, Accessibility } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { View } from '../types';
import { cn } from '../lib/utils';

interface LandingProps {
  onNavigate: (view: View) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-6 border border-brand-500/20">
              <ShieldCheck size={16} />
              <span>Next-Gen Urban Accessibility</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              <Trans i18nKey="hero_title">
                <span className="text-brand-500">Inclusive</span> Cities with Smart Tech
              </Trans>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
              {t('hero_desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('login')}
                className="px-8 py-4 rounded-2xl bg-brand-500 text-white font-bold shadow-xl shadow-brand-500/30 hover:bg-brand-600 hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                {t('get_started')} <ArrowRight size={20} />
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                {t('sign_in')}
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold">12,400+ Citizens</p>
                <p className="text-slate-500">Actively reporting issues</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border border-white/20">
              <img
                src="https://picsum.photos/seed/smartcity/800/600"
                alt="Smart City Illustration"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            </div>

            {/* Background Glow */}
            <div className="absolute -inset-4 bg-brand-500/20 blur-3xl -z-10 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('mobility_title')}</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t('mobility_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "GIS Smart Mapping",
              desc: "Real-time visualization of accessible routes and infrastructure gaps across the city.",
              icon: MapIcon,
              color: "bg-blue-500"
            },
            {
              title: "AI Infrastructure Audit",
              desc: "Automated scanning of urban areas to identify risks and suggest immediate improvements.",
              icon: Scan,
              color: "bg-indigo-500"
            },
            {
              title: "Citizen Participation",
              desc: "Direct reporting channel for citizens to flag issues and track resolution in real-time.",
              icon: Users,
              color: "bg-brand-500"
            }
          ].map((feature, idx) => (
            <motion.button
              key={idx}
              onClick={() => onNavigate('login')}
              whileHover={{ y: -10 }}
              className="text-left w-full p-8 rounded-[2rem] glass hover:shadow-2xl transition-all border border-white/10 group"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", feature.color)}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
