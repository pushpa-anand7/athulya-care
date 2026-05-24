// All screen names used in the app navigation (for TypeScript safety).
import { NavigatorScreenParams } from '@react-navigation/native';

// Screens shown before user logs in.
export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
};

// Visits tab — list of appointments only.
export type AppointmentsStackParamList = {
  AppointmentsList: undefined;
};

// Consult tab — booking flow, consultation details, and video call.
export type ConsultStackParamList = {
  ConsultHome: { appointmentId?: string } | undefined;
  BookAppointment: undefined;
  DoctorList: { specialtyId: string; specialtyLabel: string };
  SelectAvailability: { doctorId: string };
  AppointmentDetails: { appointmentId: string };
  VideoConsultation: { appointmentId: string };
  CallEnded: { appointmentId: string; durationMinutes: number };
};

export type SupportStackParamList = {
  SupportHome: undefined;
};

export type ReportsStackParamList = {
  ReportsHome: undefined;
  HealthRecordsHistory: { recordType: 'prescription' | 'lab-report' };
  HealthRecordDetail: { recordId: string };
};

// Bottom menu tabs on the main app.
export type MainTabParamList = {
  Home: undefined;
  Appointments: NavigatorScreenParams<AppointmentsStackParamList>;
  Consult: NavigatorScreenParams<ConsultStackParamList>;
  Reports: NavigatorScreenParams<ReportsStackParamList>;
  Support: NavigatorScreenParams<SupportStackParamList>;
};

// Top level: login flow, main app, profile, and AI assistant.
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  AiAssistant: undefined;
  Profile: undefined;
};
