// Fake data for the app — doctors, visits, reports, and support.
// Replace with real API calls when backend is ready.
import {
  Appointment,
  Doctor,
  HealthRecord,
  Specialty,
  SupportCategory,
  SupportQuery,
  TimeSlot,
} from '../types/models';

// Same hospital info for most doctors in the list.
const doctorDefaults = {
  hospital: 'Athulya Healthcare',
  languages: ['Tamil', 'English'],
  isOnline: true,
};

export const specialties: Specialty[] = [
  { id: 'cardiology', icon: 'heart', label: 'Cardiology' },
  { id: 'dermatology', icon: 'sunny', label: 'Dermatology' },
  { id: 'joint', icon: 'body', label: 'Joint specialist' },
  { id: 'orthopedics', icon: 'fitness', label: 'Orthopedics' },
  { id: 'neurology', icon: 'pulse', label: 'Neurologist' },
  { id: 'gynecology', icon: 'female', label: 'Gynocologist' },
];

export const doctors: Doctor[] = [
  {
    id: 'dr-arjun',
    name: 'Dr. Arjun Reddy',
    specialty: 'Cardiologist',
    specialtyId: 'cardiology',
    rating: 4.9,
    experienceYears: 15,
    patientCount: '2k',
    nextAvailable: '10 mins',
    reviewCount: 324,
    ...doctorDefaults,
  },
  {
    id: 'dr-khalif',
    name: 'Dr. Khalif Ahmed',
    specialty: 'Cardiologist',
    specialtyId: 'cardiology',
    rating: 4.8,
    experienceYears: 15,
    patientCount: '3.5k',
    nextAvailable: '25 mins',
    reviewCount: 412,
    languages: ['English', 'Hindi'],
    isOnline: true,
    hospital: 'Athulya Healthcare',
  },
  {
    id: 'dr-ananya',
    name: 'Dr. Ananya Pandey',
    specialty: 'Cardiologist',
    specialtyId: 'cardiology',
    rating: 4.7,
    experienceYears: 10,
    patientCount: '1.8k',
    nextAvailable: '15 mins',
    reviewCount: 198,
    ...doctorDefaults,
  },
  {
    id: 'dr-thomas',
    name: 'Dr. Thomas Michael',
    specialty: 'Cardiologist',
    specialtyId: 'cardiology',
    rating: 4.9,
    experienceYears: 18,
    patientCount: '4k',
    nextAvailable: '5 mins',
    reviewCount: 520,
    ...doctorDefaults,
  },
  {
    id: 'dr-priya',
    name: 'Dr. Priya Sharma',
    specialty: 'Dermatologist',
    specialtyId: 'dermatology',
    rating: 4.5,
    experienceYears: 8,
    patientCount: '1.2k',
    nextAvailable: '30 mins',
    reviewCount: 156,
    isOnline: false,
    languages: ['Tamil', 'English'],
    hospital: 'Athulya Healthcare',
  },
  {
    id: 'dr-raj',
    name: 'Dr. Raj Mehta',
    specialty: 'Orthopedics',
    specialtyId: 'orthopedics',
    rating: 4.4,
    experienceYears: 14,
    patientCount: '2.5k',
    nextAvailable: '20 mins',
    reviewCount: 267,
    ...doctorDefaults,
  },
];

export const timeSlots: TimeSlot[] = [
  { id: 's1', label: '09:00 AM', status: 'available' },
  { id: 's2', label: '10:00 AM', status: 'booked' },
  { id: 's3', label: '11:00 AM', status: 'few' },
  { id: 's4', label: '12:00 PM', status: 'few' },
  { id: 's5', label: '02:00 PM', status: 'available' },
  { id: 's6', label: '03:00 PM', status: 'booked' },
  { id: 's7', label: '04:00 PM', status: 'available' },
  { id: 's8', label: '05:00 PM', status: 'available' },
];

export let appointments: Appointment[] = [
  {
    id: 'apt-1',
    doctorId: 'dr-arjun',
    date: '2026-05-10',
    time: '10:30 AM',
    status: 'upcoming',
    patientNotes:
      'Mild chest tightness during exertion. Blood pressure slightly elevated. Would like advice on lifestyle changes.',
    priorPrescriptionFile: 'Prior_Cardiology_Rx.pdf',
    prescriptionFile: 'Prescription_May2026.pdf',
  },
];

export const supportCategories: SupportCategory[] = [
  { id: 'billing', icon: 'swap-horizontal', label: 'Billing' },
  { id: 'appointment', icon: 'medkit', label: 'Appointment' },
  { id: 'prescription', icon: 'document-text', label: 'Prescription' },
];

/** Home dashboard — Support & Queries grid (wireframe) */
export const homeSupportQueries: SupportCategory[] = [
  { id: 'raise-ticket', icon: 'ticket', label: 'Raise Ticket' },
  { id: 'live-chat', icon: 'chatbubbles', label: 'Live chat' },
  { id: 'faq', icon: 'help-circle', label: 'FAQ' },
  { id: 'track-query', icon: 'time', label: 'Track Query' },
];

export const patientPrescriptions: HealthRecord[] = [
  {
    id: 'rx-1',
    type: 'prescription',
    title: 'Prescription_May2026.pdf',
    subtitle: 'Dr. Arjun Reddy · Cardiology',
    dateLabel: '10 May 2026',
    fileType: 'PDF',
    sortKey: '2026-05-10',
    medicines: ['Atorvastatin 10 mg', 'Aspirin 75 mg'],
    notes: 'Take after breakfast. Follow up in 2 weeks.',
  },
  {
    id: 'rx-2',
    type: 'prescription',
    title: 'Prescription_April2026.pdf',
    subtitle: 'Dr. Priya Sharma · Dermatology',
    dateLabel: '2 Apr 2026',
    fileType: 'PDF',
    sortKey: '2026-04-02',
    medicines: ['Cetirizine 10 mg', 'Moisturizing lotion'],
    notes: 'Apply lotion twice daily.',
  },
  {
    id: 'rx-3',
    type: 'prescription',
    title: 'Prescription_March2026.pdf',
    subtitle: 'Dr. Arjun Reddy · Cardiology',
    dateLabel: '18 Mar 2026',
    fileType: 'PDF',
    sortKey: '2026-03-18',
    medicines: ['Metoprolol 25 mg'],
    notes: 'Monitor blood pressure weekly.',
  },
  {
    id: 'rx-4',
    type: 'prescription',
    title: 'Prescription_Feb2026.pdf',
    subtitle: 'Dr. Raj Mehta · Orthopedics',
    dateLabel: '6 Feb 2026',
    fileType: 'PDF',
    sortKey: '2026-02-06',
    medicines: ['Ibuprofen 400 mg', 'Calcium supplement'],
    notes: 'Take with food. Rest knee for 5 days.',
  },
  {
    id: 'rx-5',
    type: 'prescription',
    title: 'Prescription_Jan2026.pdf',
    subtitle: 'Dr. Thomas Michael · Cardiology',
    dateLabel: '12 Jan 2026',
    fileType: 'PDF',
    sortKey: '2026-01-12',
    medicines: ['Atorvastatin 10 mg'],
    notes: 'Annual cardiac follow-up prescription.',
  },
  {
    id: 'rx-6',
    type: 'prescription',
    title: 'Prescription_Dec2025.pdf',
    subtitle: 'Dr. Ananya Pandey · Cardiology',
    dateLabel: '20 Dec 2025',
    fileType: 'PDF',
    sortKey: '2025-12-20',
    medicines: ['Vitamin D3 60k IU'],
    notes: 'One dose per week for 8 weeks.',
  },
];

export const patientLabReports: HealthRecord[] = [
  {
    id: 'lab-1',
    type: 'lab-report',
    title: 'Blood_Sugar_Report.pdf',
    subtitle: 'Fasting glucose · Lipid panel',
    dateLabel: '8 May 2026',
    fileType: 'PDF',
    sortKey: '2026-05-08',
    notes: 'Fasting glucose: 98 mg/dL. LDL within normal range.',
  },
  {
    id: 'lab-2',
    type: 'lab-report',
    title: 'CBC_Report.pdf',
    subtitle: 'Complete blood count',
    dateLabel: '15 Mar 2026',
    fileType: 'PDF',
    sortKey: '2026-03-15',
    notes: 'All parameters within reference range.',
  },
  {
    id: 'lab-3',
    type: 'lab-report',
    title: 'Lipid_Profile_Jan2026.pdf',
    subtitle: 'Cholesterol · Triglycerides',
    dateLabel: '10 Jan 2026',
    fileType: 'PDF',
    sortKey: '2026-01-10',
    notes: 'Total cholesterol slightly elevated. Diet advised.',
  },
  {
    id: 'lab-4',
    type: 'lab-report',
    title: 'Thyroid_Panel_Nov2025.pdf',
    subtitle: 'TSH · T3 · T4',
    dateLabel: '22 Nov 2025',
    fileType: 'PDF',
    sortKey: '2025-11-22',
    notes: 'Thyroid function normal.',
  },
  {
    id: 'lab-5',
    type: 'lab-report',
    title: 'Vitamin_D_Report.pdf',
    subtitle: '25-OH Vitamin D',
    dateLabel: '5 Oct 2025',
    fileType: 'PDF',
    sortKey: '2025-10-05',
    notes: 'Vitamin D deficiency noted. Supplementation started.',
  },
  {
    id: 'lab-6',
    type: 'lab-report',
    title: 'Urine_Routine_Aug2025.pdf',
    subtitle: 'Urinalysis',
    dateLabel: '14 Aug 2025',
    fileType: 'PDF',
    sortKey: '2025-08-14',
    notes: 'No abnormalities detected.',
  },
];

export function getHealthRecordsByType(
  type: 'prescription' | 'lab-report',
): HealthRecord[] {
  const list =
    type === 'prescription' ? patientPrescriptions : patientLabReports;
  return [...list].sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}

export function getHealthRecordById(id: string): HealthRecord | undefined {
  return [...patientPrescriptions, ...patientLabReports].find((r) => r.id === id);
}

export function groupHealthRecordsByMonth(
  records: HealthRecord[],
): { title: string; data: HealthRecord[] }[] {
  const groups = new Map<string, { title: string; data: HealthRecord[] }>();
  for (const record of records) {
    const d = new Date(record.sortKey);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const title = d.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
    });
    if (!groups.has(key)) {
      groups.set(key, { title, data: [] });
    }
    groups.get(key)!.data.push(record);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([, group]) => group);
}

export const supportQueries: SupportQuery[] = [
  {
    id: 'Q-24',
    title: 'Refund for cancelled visit',
    status: 'In Progress',
    timeAgo: '2h ago',
  },
  {
    id: 'Q-23',
    title: 'Prescription not visible',
    status: 'In Progress',
    timeAgo: '1d ago',
  },
];

export const feedbackTags = [
  'Clear explanation',
  'Friendly',
  'Punctual',
  'Good Advice',
];

export const PATIENT_NAME = 'Pushpalakshmi';

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}

export function getDoctorsBySpecialty(specialtyId: string): Doctor[] {
  return doctors.filter((d) => d.specialtyId === specialtyId);
}

export function getTopDoctors(): Doctor[] {
  return [...doctors].sort((a, b) => b.rating - a.rating).slice(0, 5);
}

export function getRecommendedDoctors(): Doctor[] {
  return doctors.filter((d) => d.isOnline).slice(0, 4);
}

export function getAppointmentById(id: string): Appointment | undefined {
  return appointments.find((a) => a.id === id);
}

// Adds a new visit to the list (used after patient confirms booking).
export function createAppointment(
  doctorId: string,
  date: string,
  time: string,
  options?: {
    patientNotes?: string;
    priorPrescriptionFile?: string | null;
  },
): Appointment {
  const appointment: Appointment = {
    id: `apt-${Date.now()}`,
    doctorId,
    date,
    time,
    status: 'upcoming',
    patientNotes: options?.patientNotes?.trim() || undefined,
    priorPrescriptionFile: options?.priorPrescriptionFile ?? undefined,
  };
  appointments = [appointment, ...appointments];
  return appointment;
}

export function formatAppointmentDate(date: string): string {
  const d = new Date(date);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}
