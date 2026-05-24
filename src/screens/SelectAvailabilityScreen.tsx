// Step 3 of booking — pick date, time, notes, then show success popup.
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookConsultationModal } from '../components/BookConsultationModal';
import { SuccessPopup } from '../components/SuccessPopup';
import { BottomActionBar } from '../components/BottomActionBar';
import { DoctorCard } from '../components/DoctorCard';
import { FadeInView } from '../components/FadeInView';
import { MonthCalendar } from '../components/MonthCalendar';
import { ScreenHeader } from '../components/ScreenHeader';
import { SectionTitle } from '../components/SectionTitle';
import { ProgressStepper } from '../components/ProgressStepper';
import { TimeSlotPicker } from '../components/TimeSlotPicker';
import { colors, spacing } from '../constants/theme';
import {
  createAppointment,
  getDoctorById,
  timeSlots,
} from '../data/mockData';
import { TimeSlot } from '../types/models';
import { ConsultStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ConsultStackParamList, 'SelectAvailability'>;

export function SelectAvailabilityScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const doctor = getDoctorById(route.params.doctorId);
  const [selectedDay, setSelectedDay] = useState(19);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>();
  const [modalVisible, setModalVisible] = useState(false);
  const [patientNotes, setPatientNotes] = useState('');
  const [priorPrescriptionFile, setPriorPrescriptionFile] = useState<string | null>(
    null,
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookedAppointmentId, setBookedAppointmentId] = useState<string | null>(null);

  if (!doctor) {
    return null;
  }

  // Open form to type consultation notes before final booking.
  const handleBookPress = () => {
    if (!selectedSlot) return;
    setModalVisible(true);
  };

  const handlePickPrescription = () => {
    if (priorPrescriptionFile) {
      Alert.alert('Remove file?', 'Remove the uploaded prescription?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setPriorPrescriptionFile(null),
        },
        { text: 'Replace', onPress: () => setPriorPrescriptionFile('Prior_Prescription.pdf') },
      ]);
      return;
    }
    setPriorPrescriptionFile('Prior_Prescription.pdf');
  };

  // Save appointment in mock data, then show success popup (same style as login).
  const handleConfirmBooking = () => {
    if (!selectedSlot || !patientNotes.trim()) return;
    const appointment = createAppointment(
      doctor.id,
      `2026-05-${String(selectedDay).padStart(2, '0')}`,
      selectedSlot.label,
      {
        patientNotes: patientNotes.trim(),
        priorPrescriptionFile,
      },
    );
    setModalVisible(false);
    setPatientNotes('');
    setPriorPrescriptionFile(null);
    setBookedAppointmentId(appointment.id);
    setShowSuccess(true);
  };

  const goToConsultation = () => {
    setShowSuccess(false);
    if (bookedAppointmentId) {
      navigation.navigate('ConsultHome', {
        appointmentId: bookedAppointmentId,
      });
    }
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Select Availability"
        onBack={() => navigation.goBack()}
      />

      <ProgressStepper
        current={3}
        labels={['Specialty', 'Doctor', 'Schedule']}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <FadeInView>
          <DoctorCard doctor={doctor} compact />
        </FadeInView>

        <FadeInView delay={80}>
          <MonthCalendar
            monthLabel="May 2026"
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </FadeInView>

        <FadeInView delay={120}>
          <SectionTitle title="Available time slots" />
          <TimeSlotPicker
            slots={timeSlots}
            selectedId={selectedSlot?.id}
            onSelect={setSelectedSlot}
          />
          <View style={styles.legend}>
            <LegendDot color={colors.slotAvailable} label="Available" />
            <LegendDot color={colors.slotBooked} label="Booked" />
            <LegendDot color={colors.slotPending} label="Few left" />
          </View>
        </FadeInView>
      </ScrollView>

      <BottomActionBar
        label="Book Now"
        onPress={handleBookPress}
        disabled={!selectedSlot}
      />

      <BookConsultationModal
        visible={modalVisible}
        notes={patientNotes}
        prescriptionFile={priorPrescriptionFile}
        onChangeNotes={setPatientNotes}
        onPickPrescription={handlePickPrescription}
        onConfirm={handleConfirmBooking}
        onClose={() => setModalVisible(false)}
      />

      <SuccessPopup
        visible={showSuccess}
        title="Appointment booked!"
        message={`Your visit with ${doctor.name} is confirmed for May ${selectedDay} at ${selectedSlot?.label ?? ''}.`}
        buttonLabel="View consultation"
        onContinue={goToConsultation}
      />
    </View>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingBottom: 180,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 10,
    color: colors.textMuted,
  },
});
