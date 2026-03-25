import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, AlertTriangle, CheckCircle2, Clock, MapPin, MoreVertical } from 'lucide-react';
import { Issue } from '../types';
import { cn } from '../lib/utils';

interface AdminDashboardProps {
  issues: Issue[];
  onResolve: (id: string) => void;
}

export default function AdminDashboard({ issues, onResolve }: AdminDashboardProps) {
  const stats = [
    { label: 'Total Issues', value: issues.length, icon: LayoutDashboard, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Pending', value: issues.filter(i => i.status === 'pending').length, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Resolved', value: issues.filter(i => i.status === 'resolved').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Critical', value: issues.filter(i => i.severity === 'high').length, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  const barData = [
    { name: 'Sector 1', issues: 12 },
    { name: 'Sector 2', issues: 19 },
    { name: 'Sector 3', issues: 8 },
    { name: 'Sector 4', issues: 15 },
    { name: 'Sector 5', issues: 22 },
  ];

  const pieData = [
    { name: 'Broken Footpath', value: 40 },
    { name: 'No Ramp', value: 30 },
    { name: 'No Tactile', value: 20 },
    { name: 'No Audio', value: 10 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h2 className="text-4xl font-bold">Admin Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400">Infrastructure management and analytics portal.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold hover:bg-slate-50 transition-all">
            Export Data
          </button>
          <button className="px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="glass rounded-3xl p-6 shadow-xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400">+12% vs last month</span>
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-display font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 glass rounded-[2.5rem] p-8 shadow-xl border border-white/10">
          <h3 className="text-xl font-bold mb-8">Issues by Urban Sector</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Bar dataKey="issues" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-8 shadow-xl border border-white/10">
          <h3 className="text-xl font-bold mb-8">Issue Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-slate-500">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="glass rounded-[2.5rem] overflow-hidden shadow-xl border border-white/10">
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-bold">Recent Reports</h3>
          <button className="text-sm font-bold text-brand-500 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <th className="px-8 py-4">Location</th>
                <th className="px-8 py-4">Issue Type</th>
                <th className="px-8 py-4">Severity</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{issue.location.address}</p>
                        <p className="text-[10px] text-slate-400">{new Date(issue.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm capitalize">{issue.type.replace('-', ' ')}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                      issue.severity === 'high' ? "bg-red-500/20 text-red-600" :
                      issue.severity === 'medium' ? "bg-yellow-500/20 text-yellow-600" :
                      "bg-blue-500/20 text-blue-600"
                    )}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        issue.status === 'resolved' ? "bg-emerald-500" : "bg-orange-500"
                      )} />
                      <span className="text-sm capitalize">{issue.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {issue.status === 'pending' ? (
                      <button 
                        onClick={() => onResolve(issue.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all"
                      >
                        Mark Resolved
                      </button>
                    ) : (
                      <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                        <MoreVertical size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
