
export type UserRole = 'NGO_ADMIN' | 'VOLUNTEER';

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  location: Location;
  availability: 'Available' | 'Busy' | 'Offline';
  rating: number;
  completedTasks: number;
  proximityDistance?: number; // Calculated on the fly
}

export interface UrgencyIssue {
  id: string;
  title: string;
  description: string;
  urgencyLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  location: Location;
  category: 'Medical' | 'Food' | 'Shelter' | 'Water' | 'Sanitation';
  createdAt: string;
}

export interface Task {
  id: string;
  issueId: string;
  issueTitle: string;
  volunteerId?: string;
  status: 'Pending' | 'Assigned' | 'Accepted' | 'Completed' | 'Declined';
  urgencyLevel: UrgencyIssue['urgencyLevel'];
  location: Location;
  description: string;
}

export interface ImpactData {
  date: string;
  tasksCompleted: number;
  peopleHelped: number;
}
