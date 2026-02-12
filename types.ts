
export enum GrievanceStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED'
}

export enum UserRole {
  CITIZEN = 'CITIZEN',
  ADMIN = 'ADMIN'
}

export interface Grievance {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  status: GrievanceStatus;
  createdAt: string;
  citizenName: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface AIAnalysisResult {
  category: string;
  department: string;
  priority: 'Low' | 'Medium' | 'High';
  estimatedResolutionDays: number;
  confidence: number;
  suggestions: string[];
}
