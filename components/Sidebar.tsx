
import React from 'react';
import { User, UserRole } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, user }) => {
  const navItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { id: 'incidents', icon: 'fa-triangle-exclamation', label: 'Incidents' },
    { id: 'assets', icon: 'fa-shield-halved', label: 'Assets' },
  ];

  return (
    <nav className="w-64 border-r border-slate-800/50 bg-[#0d0d0e] flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
            <i className="fas fa-microchip text-white"></i>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">Nexus<span className="text-blue-500">AI</span></span>
        </div>

        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold border border-slate-600">
            SC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{user.role}</p>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
