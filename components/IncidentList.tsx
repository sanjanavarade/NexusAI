
import React from 'react';
import { Incident, IncidentPriority, IncidentStatus } from '../types';

interface IncidentListProps {
  incidents: Incident[];
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => {
  const getPriorityColor = (priority: IncidentPriority) => {
    switch(priority) {
      case IncidentPriority.CRITICAL: return 'bg-red-500/10 text-red-500 border-red-500/20';
      case IncidentPriority.HIGH: return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case IncidentPriority.MEDIUM: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case IncidentPriority.LOW: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: IncidentStatus) => {
    switch(status) {
      case IncidentStatus.ACTIVE: return 'fa-spinner fa-spin text-blue-400';
      case IncidentStatus.RESOLVED: return 'fa-check-circle text-green-400';
      case IncidentStatus.REPORTED: return 'fa-clock text-slate-400';
      default: return 'fa-circle-info text-slate-400';
    }
  };

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <div 
          key={incident.id} 
          className="group bg-[#121214] border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all cursor-pointer shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${getPriorityColor(incident.priority)}`}>
                  {incident.priority}
                </span>
                <span className="text-slate-500 text-xs mono">#{incident.id}</span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-slate-500 text-xs">{new Date(incident.createdAt).toLocaleTimeString()}</span>
              </div>
              
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{incident.title}</h4>
              <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-4">{incident.description}</p>
              
              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <i className="fas fa-location-dot"></i>
                  <span>{incident.location.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-user-circle"></i>
                  <span>Reported by {incident.reportedBy}</span>
                </div>
              </div>
            </div>

            <div className="md:w-72 space-y-4">
              {incident.aiAnalysis ? (
                <div className="bg-blue-600/5 border border-blue-500/10 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-blue-400">
                    <i className="fas fa-robot text-xs"></i>
                    <span className="text-[10px] font-bold uppercase tracking-wider">AI Analysis</span>
                  </div>
                  <p className="text-[11px] text-slate-300 italic mb-2">"{incident.aiAnalysis.summary}"</p>
                  <div className="space-y-1">
                    {incident.aiAnalysis.suggestedSteps.slice(0, 2).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[10px] text-slate-400">
                        <span className="text-blue-500">•</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center border border-dashed border-slate-800 rounded-xl p-4">
                  <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">Awaiting Triage</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center px-4 border-l border-slate-800">
                <i className={`fas ${getStatusIcon(incident.status)} text-lg mb-1`}></i>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{incident.status}</p>
              </div>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncidentList;
