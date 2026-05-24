import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
};

export type AppointmentsStackParamList = {
  AppointmentsList: undefined;
};

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

export type MainTabParamList = {
  Home: undefined;
  Appointments: NavigatorScreenParams<AppointmentsStackParamList>;
  Consult: NavigatorScreenParams<ConsultStackParamList>;
  Reports: NavigatorScreenParams<ReportsStackParamList>;
  Support: NavigatorScreenParams<SupportStackParamList>;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  AiAssistant: undefined;
  Profile: undefined;
};
