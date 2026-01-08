
import React from 'react';
import { Incident, IncidentStatus, IncidentPriority } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  incidents: Incident[];
}

const Dashboard: React.FC<DashboardProps> = ({ incidents }) => {
  const stats = {
    total: incidents.length,
    active: incidents.filter(i => i.status === IncidentStatus.ACTIVE).length,
    critical: incidents.filter(i => i.priority === IncidentPriority.CRITICAL).length,
    resolvedToday: incidents.filter(i => i.status === IncidentStatus.RESOLVED).length,
  };

  const chartData = [
    { name: 'Critical', count: incidents.filter(i => i.priority === IncidentPriority.CRITICAL).length, color: '#ef4444' },
    { name: 'High', count: incidents.filter(i => i.priority === IncidentPriority.HIGH).length, color: '#f97316' },
    { name: 'Medium', count: incidents.filter(i => i.priority === IncidentPriority.MEDIUM).length, color: '#eab308' },
    { name: 'Low', count: incidents.filter(i => i.priority === IncidentPriority.LOW).length, color: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Incidents', value: stats.total, icon: 'fa-list', color: 'blue' },
          { label: 'Active Tasks', value: stats.active, icon: 'fa-pulse fa-bolt', color: 'orange' },
          { label: 'Critical Risk', value: stats.critical, icon: 'fa-radiation', color: 'red' },
          { label: 'Resolved (24h)', value: stats.resolvedToday, icon: 'fa-check-circle', color: 'green' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#121214] border border-slate-800 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
              <i className={`fas ${stat.icon} text-${stat.color}-500`}></i>
            </div>
            <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
            <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
              <i className="fas fa-arrow-trend-up text-green-500"></i>
              <span>+12% from last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#121214] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Severity Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'rgba(59, 130, 246, 0.1)'}}
                  contentStyle={{backgroundColor: '#1a1a1c', borderColor: '#334155', color: '#fff'}}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#121214] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Top Risk Categories</h3>
          <div className="space-y-4">
            {['Cybersecurity', 'Logistics', 'Public Safety', 'Technical'].map((cat, i) => (
              <div key={cat} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">{cat}</span>
                  <span className="text-white font-medium">{[65, 42, 18, 88][i]}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-blue-500 rounded-full`} 
                    style={{width: `${[65, 42, 18, 88][i]}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800">
             <div className="flex items-center gap-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
               <i className="fas fa-robot text-blue-400"></i>
               <p className="text-[10px] text-blue-300 leading-tight">
                 AI Predictive Engine suggests a 15% risk increase in <b>Technical</b> sector tonight due to generator maintenance.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
