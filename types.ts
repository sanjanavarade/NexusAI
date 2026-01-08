
export enum IncidentStatus {
  REPORTED = 'REPORTED',
  TRIAGED = 'TRIAGED',
  ACTIVE = 'ACTIVE',
  RESOLVED = 'RESOLVED',
  ARCHIVED = 'ARCHIVED'
}

export enum IncidentPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  DISPATCHER = 'DISPATCHER',
  RESPONDER = 'RESPONDER',
  VIEWER = 'VIEWER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: IncidentStatus;
  priority: IncidentPriority;
  reportedBy: string;
  assignedTo?: string[];
  aiAnalysis?: {
    riskScore: number;
    category: string;
    suggestedSteps: string[];
    summary: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LogEntry {
  id: string;
  incidentId: string;
  userId: string;
  action: string;
  timestamp: string;
}
