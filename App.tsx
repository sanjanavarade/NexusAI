
import React, { useState, useEffect } from 'react';
import { 
  Incident, 
  IncidentStatus, 
  IncidentPriority, 
  UserRole,
  User 
} from './types';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import IncidentList from './components/IncidentList';
import ReportIncidentModal from './components/ReportIncidentModal';
import { analyzeIncident } from './services/geminiService';

const MOCK_USER: User = {
  id: 'u1',
  name: 'Sarah Connor',
  email: 's.connor@nexus.ai',
  role: UserRole.DISPATCHER,
  department: 'Operations'
};

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-001',
    title: 'Server Farm Power Failure',
    description: 'Multiple backup generators failing in Sector 7G.',
    location: { lat: 34.0522, lng: -118.2437, address: 'Sector 7G, Industrial District' },
    status: IncidentStatus.ACTIVE,
    priority: IncidentPriority.CRITICAL,
    reportedBy: 'System Monitor',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updatedAt: new Date().toISOString(),
    aiAnalysis: {
      riskScore: 9,
      category: 'TECHNICAL',
      summary: 'Critical infrastructure failure with cascading backup risks.',
      suggestedSteps: ['Dispatch electrical team', 'Initiate data migration', 'Contact power utility']
    }
  },
  {
    id: 'inc-002',
    title: 'Water Main Leak',
    description: 'Minor flooding observed near the lobby entrance.',
    location: { lat: 34.0530, lng: -118.2440, address: 'Main Lobby, Building A' },
    status: IncidentStatus.REPORTED,
    priority: IncidentPriority.LOW,
    reportedBy: 'Janitorial Staff',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'incidents' | 'assets'>('dashboard');
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleReportIncident = async (newIncidentData: Partial<Incident>) => {
    setIsAnalyzing(true);
    
    // Simulate API call and AI Triage
    const aiResult = await analyzeIncident(newIncidentData.description || "");

    const newIncident: Incident = {
      id: `inc-${Math.random().toString(36).substr(2, 9)}`,
      title: newIncidentData.title || 'Untitled Incident',
      description: newIncidentData.description || '',
      location: newIncidentData.location || { lat: 0, lng: 0, address: 'Unknown' },
      status: IncidentStatus.REPORTED,
      priority: aiResult.riskScore > 7 ? IncidentPriority.HIGH : IncidentPriority.MEDIUM,
      reportedBy: MOCK_USER.name,
      aiAnalysis: aiResult,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setIncidents(prev => [newIncident, ...prev]);
    setIsAnalyzing(false);
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-slate-200 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={MOCK_USER} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-6 bg-[#0a0a0b]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight text-white capitalize">{activeTab}</h1>
            <div className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded uppercase tracking-widest border border-green-500/20">
              Live Connection
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <i className="fas fa-plus"></i>
              Report Incident
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && <Dashboard incidents={incidents} />}
          {activeTab === 'incidents' && <IncidentList incidents={incidents} />}
          {activeTab === 'assets' && (
            <div className="h-full flex items-center justify-center text-slate-500 flex-col gap-4">
              <i className="fas fa-boxes-stacked text-4xl"></i>
              <p>Asset Management coming soon...</p>
            </div>
          )}
        </div>
      </main>

      {/* Reporting Modal */}
      {isModalOpen && (
        <ReportIncidentModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleReportIncident}
          isLoading={isAnalyzing}
        />
      )}
    </div>
  );
};

export default App;
