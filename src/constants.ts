
import { UrgencyIssue, Volunteer, ImpactData, Task } from './types';

export const MOCK_ISSUES: UrgencyIssue[] = [
  {
    id: 'iss-1',
    title: 'Water Scarcity in Sector 4',
    description: 'Multiple reports of community wells drying up. Urgent need for water tankers.',
    urgencyLevel: 'Critical',
    location: { lat: 12.9716, lng: 77.5946 }, // Bangalore coordinates
    category: 'Water',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'iss-2',
    title: 'Flood Alert - North Ring',
    description: 'River levels rising exponentially. Evacuation might be needed.',
    urgencyLevel: 'High',
    location: { lat: 12.9816, lng: 77.6046 },
    category: 'Shelter',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'iss-3',
    title: 'Medical Supply Shortage',
    description: 'Local clinic report missing basic antibiotics and bandages.',
    urgencyLevel: 'Medium',
    location: { lat: 12.9616, lng: 77.5846 },
    category: 'Medical',
    createdAt: new Date().toISOString(),
  }
];

export const MOCK_VOLUNTEERS: Volunteer[] = [
  {
    id: 'vol-1',
    name: 'Sarah Chen',
    avatar: 'https://picsum.photos/seed/sarah/200',
    skills: ['Medical Support', 'Logistics'],
    location: { lat: 12.9750, lng: 77.5900 },
    availability: 'Available',
    rating: 4.8,
    completedTasks: 42,
  },
  {
    id: 'vol-2',
    name: 'Marcus Thorne',
    avatar: 'https://picsum.photos/seed/marcus/200',
    skills: ['Water Management', 'First Aid'],
    location: { lat: 12.9650, lng: 77.6100 },
    availability: 'Available',
    rating: 4.5,
    completedTasks: 15,
  },
  {
    id: 'vol-3',
    name: 'Elena Rodriguez',
    avatar: 'https://picsum.photos/seed/elena/200',
    skills: ['Logistics', 'Driver'],
    location: { lat: 12.9800, lng: 77.6200 },
    availability: 'Available',
    rating: 4.9,
    completedTasks: 89,
  },
  {
    id: 'vol-4',
    name: 'David Kim',
    avatar: 'https://picsum.photos/seed/david/200',
    skills: ['Shelter Build', 'Heavy Lifting'],
    location: { lat: 12.9500, lng: 77.5700 },
    availability: 'Busy',
    rating: 4.2,
    completedTasks: 12,
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    issueId: 'iss-1',
    issueTitle: 'Water Scarcity in Sector 4',
    status: 'Pending',
    urgencyLevel: 'Critical',
    location: { lat: 12.9716, lng: 77.5946 },
    description: 'Coordinate water tanker arrival at Main Square.',
  }
];

export const MOCK_IMPACT_DATA: ImpactData[] = [
  { date: 'Mon', tasksCompleted: 12, peopleHelped: 450 },
  { date: 'Tue', tasksCompleted: 18, peopleHelped: 620 },
  { date: 'Wed', tasksCompleted: 15, peopleHelped: 510 },
  { date: 'Thu', tasksCompleted: 22, peopleHelped: 890 },
  { date: 'Fri', tasksCompleted: 30, peopleHelped: 1200 },
  { date: 'Sat', tasksCompleted: 25, peopleHelped: 950 },
  { date: 'Sun', tasksCompleted: 10, peopleHelped: 300 },
];
