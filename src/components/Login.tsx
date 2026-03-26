import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, ShieldCheck, Accessibility, Github, Users, Eye, EyeOff } from 'lucide-react';
import { cn } from '../lib/utils';
import { View } from '../types';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: (name: string, email: string) => void;
  onNavigate: (view: View) => void;
}

export default function Login({ onLogin, onNavigate }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        });
        if (error) throw error;
        if (data.user) {
          setMessage('Account created! Check your email to verify.');
          onLogin(name || data.user.email?.split('@')[0] || 'User', email);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          const displayName = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User';
          onLogin(displayName, data.user.email || email);
        }
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-brand-500/20">
              <Accessibility size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {isSignUp ? 'Join the InclusiveCity community' : 'Login to access the InclusiveCity platform'}
            </p>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-brand-500/50 hover:bg-brand-500/5 transition-all font-bold text-sm mb-6 group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="group-hover:text-brand-500 transition-colors">Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <span className="relative px-4 bg-white dark:bg-slate-900 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or continue with email</span>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-xs font-bold ml-1 uppercase tracking-widest text-slate-400">Full Name</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold ml-1 uppercase tracking-widest text-slate-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</label>
                {!isSignUp && <button type="button" className="text-[10px] font-bold text-brand-500 hover:underline">Forgot Password?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-xl mt-2",
                isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600 shadow-brand-500/30 hover:-translate-y-1"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
              className="font-bold text-brand-500 hover:underline ml-1"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <ShieldCheck size={14} />
          Secure Authentication via Supabase
        </div>
      </motion.div>
    </div>
  );
}
