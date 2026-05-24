// Data shapes used across the app (doctor, visit, report, etc.).

export type Specialty = {
  id: string;
  icon: string;
  label: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  specialtyId: string;
  hospital: string;
  rating: number;
  experienceYears: number;
  patientCount: string;
  languages: string[];
  nextAvailable: string;
  isOnline: boolean;
  reviewCount: number;
};

export type SlotStatus = 'available' | 'booked' | 'pending' | 'few';

export type TimeSlot = {
  id: string;
  label: string;
  status: SlotStatus;
};

export type Appointment = {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed';
  // What the patient typed when booking
  patientNotes?: string;
  // Old prescription file name (mock upload)
  priorPrescriptionFile?: string;
  // Doctor notes after the visit
  notes?: string;
  /** Prescription issued by hospital after visit */
  prescriptionFile?: string;
};

export type SupportCategory = {
  id: string;
  icon: string;
  label: string;
};

export type SupportQuery = {
  id: string;
  title: string;
  status: 'In Progress' | 'Resolved' | 'Open';
  timeAgo: string;
};

export type HealthRecord = {
  id: string;
  type: 'prescription' | 'lab-report';
  title: string;
  subtitle: string;
  dateLabel: string;
  fileType: string;
  sortKey: string;
  medicines?: string[];
  notes?: string;
};
