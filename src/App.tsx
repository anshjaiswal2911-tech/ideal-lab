/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Map as MapIcon, 
  AlertTriangle, 
  Scan, 
  Activity as TrafficLight, 
  LayoutDashboard, 
  Navigation, 
  Accessibility, 
  Moon, 
  Sun,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  Info,
  Filter,
  Camera,
  Search,
  ArrowRight,
  ShieldCheck,
  Users,
  Building2
} from 'lucide-react';
import { cn } from './lib/utils';
import { View, Issue, AccessibilityMode } from './types';

// Components
import Landing from './components/Landing';
import MapSection from './components/MapSection';
import ReportForm from './components/ReportForm';
import AIAudit from './components/AIAudit';
import CrossingSimulation from './components/CrossingSimulation';
import AdminDashboard from './components/AdminDashboard';
import RoutePlanner from './components/RoutePlanner';
import Login from './components/Login';
import Home from './components/Home';
import VolunteerBuddy from './components/VolunteerBuddy';
import IoTAmenities from './components/IoTAmenities';
import Challenges from './components/Challenges';
import EmergencySOS from './components/EmergencySOS';
import VoiceNav from './components/VoiceNav';
import CommunityImpact from './components/CommunityImpact';
import LanguageSelector from './components/LanguageSelector';

export default function App() {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState<View>('landing');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [accMode, setAccMode] = useState<AccessibilityMode>({
    highContrast: false,
    largeText: false,
    voiceNav: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: '1',
      type: 'broken-footpath',
      severity: 'high',
      location: { lat: 40.7128, lng: -74.0060, address: 'Broadway & Wall St' },
      description: 'Major cracks in the sidewalk making it impassable for wheelchairs.',
      status: 'pending',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'no-ramp',
      severity: 'medium',
      location: { lat: 40.7142, lng: -74.0059, address: 'Chambers St' },
      description: 'Missing ramp at the intersection.',
      status: 'resolved',
      timestamp: new Date().toISOString(),
    }
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleAccMode = (key: keyof AccessibilityMode) => {
    setAccMode(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = isLoggedIn ? [
    { id: 'home', label: t('home'), icon: Building2 },
    { id: 'map', label: t('map'), icon: MapIcon },
    { id: 'report', label: t('report_issue'), icon: AlertTriangle },
    { id: 'audit', label: t('audit'), icon: Scan },
    { id: 'crossing', label: t('crossing'), icon: TrafficLight },
    { id: 'dashboard', label: 'Admin', icon: LayoutDashboard },
    { id: 'route', label: t('route'), icon: Navigation },
  ] : [
    { id: 'landing', label: t('home'), icon: Building2 },
  ];

  return (
    <div className={cn(
      "min-h-screen transition-all duration-500",
      accMode.highContrast && "accessibility-high-contrast",
      accMode.largeText && "accessibility-large-text"
    )}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentView('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
              <Accessibility size={24} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
              Inclusive<span className="text-brand-500">City</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as View)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  currentView === item.id 
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/20" 
                    : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                )}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            {isLoggedIn ? (
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white text-[10px] font-bold">
                  {user?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </div>
                <div className="hidden lg:block">
                  <p className="text-[10px] font-bold leading-none">{user?.name || 'User'}</p>
                  <p className="text-[8px] text-slate-500 leading-none mt-1">Citizen</p>
                </div>
                <button 
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUser(null);
                    setCurrentView('landing');
                  }}
                  className="ml-2 p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                  title={t('logout')}
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('login')}
                className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all"
              >
                {t('sign_in')}
              </button>
            )}

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="relative group">
              <button
                className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Accessibility settings"
              >
                <Accessibility size={20} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-64 glass rounded-2xl p-4 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                <h4 className="font-display font-semibold mb-3 text-sm">Accessibility Mode</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-xs font-medium">High Contrast</span>
                    <input 
                      type="checkbox" 
                      checked={accMode.highContrast} 
                      onChange={() => toggleAccMode('highContrast')}
                      className="accent-brand-500"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-xs font-medium">Large Text</span>
                    <input 
                      type="checkbox" 
                      checked={accMode.largeText} 
                      onChange={() => toggleAccMode('largeText')}
                      className="accent-brand-500"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-xs font-medium">Voice Navigation</span>
                    <input 
                      type="checkbox" 
                      checked={accMode.voiceNav} 
                      onChange={() => toggleAccMode('voiceNav')}
                      className="accent-brand-500"
                    />
                  </label>
                </div>
              </div>
            </div>

            <button 
              className="md:hidden p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-20 px-4 glass md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as View);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "w-full px-6 py-4 rounded-2xl text-left font-medium flex items-center gap-4 transition-all",
                    currentView === item.id 
                      ? "bg-brand-500 text-white shadow-lg" 
                      : "hover:bg-slate-200 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full"
          >
            {currentView === 'landing' && <Landing onNavigate={setCurrentView} />}
            {currentView === 'home' && <Home onNavigate={setCurrentView} userName={user?.name} />}
            {currentView === 'volunteer' && <VolunteerBuddy onNavigate={setCurrentView} />}
            {currentView === 'iot' && <IoTAmenities onNavigate={setCurrentView} />}
            {currentView === 'challenges' && <Challenges onNavigate={setCurrentView} />}
            {currentView === 'sos' && <EmergencySOS onNavigate={setCurrentView} />}
            {currentView === 'voice' && <VoiceNav onNavigate={setCurrentView} />}
            {currentView === 'impact' && <CommunityImpact onNavigate={setCurrentView} />}
            {currentView === 'login' && (
              <Login 
                onLogin={(name, email) => {
                  setIsLoggedIn(true);
                  setUser({ name, email });
                  setCurrentView('home');
                }} 
                onNavigate={setCurrentView} 
              />
            )}
            
            {isLoggedIn ? (
              <>
                {currentView === 'map' && <MapSection issues={issues} />}
                {currentView === 'report' && <ReportForm onReport={(newIssue) => setIssues([newIssue, ...issues])} />}
                {currentView === 'audit' && <AIAudit />}
                {currentView === 'crossing' && <CrossingSimulation accMode={accMode} />}
                {currentView === 'dashboard' && <AdminDashboard issues={issues} onResolve={(id) => setIssues(issues.map(i => i.id === id ? {...i, status: 'resolved'} : i))} />}
                {currentView === 'route' && <RoutePlanner />}
              </>
            ) : (
              currentView !== 'landing' && currentView !== 'login' && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 mb-6">
                    <ShieldCheck size={40} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Protected Feature</h2>
                  <p className="text-slate-500 max-w-md mb-8">Please sign in to access this feature and explore the full capabilities of InclusiveCity.</p>
                  <button 
                    onClick={() => setCurrentView('login')}
                    className="px-8 py-4 rounded-2xl bg-brand-500 text-white font-bold shadow-xl shadow-brand-500/20 hover:bg-brand-600 transition-all"
                  >
                    {t('sign_in')}
                  </button>
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <Accessibility size={18} />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                Inclusive<span className="text-brand-500">City</span>
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm leading-relaxed">
              Building smarter, more inclusive urban environments through advanced technology and community-driven data. Empowering every citizen to navigate their city with dignity and ease.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => setCurrentView('map')} className="hover:text-brand-500 transition-colors">Accessibility Map</button></li>
              <li><button onClick={() => setCurrentView('audit')} className="hover:text-brand-500 transition-colors">AI Infrastructure Audit</button></li>
              <li><button onClick={() => setCurrentView('crossing')} className="hover:text-brand-500 transition-colors">Smart Crossing</button></li>
              <li><button onClick={() => setCurrentView('route')} className="hover:text-brand-500 transition-colors">Route Planning</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-brand-500 transition-colors">Citizen Portal</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Authority Login</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 InclusiveCity Infrastructure System. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-500 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-500 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
