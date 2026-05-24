import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DoctorCard } from '../components/DoctorCard';
import { FadeInView } from '../components/FadeInView';
import { OutlinedButton } from '../components/OutlinedButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { SectionTitle } from '../components/SectionTitle';
import { colors, radius, spacing } from '../constants/theme';
import {
  formatAppointmentDate,
  getAppointmentById,
  getDoctorById,
} from '../data/mockData';
import { ConsultStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ConsultStackParamList, 'AppointmentDetails'>;

export function AppointmentDetailsScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const appointment = getAppointmentById(route.params.appointmentId);
  const doctor = appointment
    ? getDoctorById(appointment.doctorId)
    : undefined;

  if (!appointment || !doctor) {
    return null;
  }

  const consultationNotes =
    appointment.patientNotes ||
    appointment.notes ||
    'No consultation notes provided.';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Consultation"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <FadeInView>
          <DoctorCard doctor={doctor} variant="detail" showFollow />
        </FadeInView>

        <FadeInView delay={60}>
          <View style={styles.actions}>
            <OutlinedButton
              label="Start Video call"
              icon="videocam"
              onPress={() =>
                navigation.navigate('VideoConsultation', {
                  appointmentId: appointment.id,
                })
              }
            />
            <OutlinedButton
              label="Open chat"
              icon="chatbubble"
              filled
              onPress={() => {}}
            />
          </View>
        </FadeInView>

        <FadeInView delay={100}>
          <SectionTitle title="Consultation Notes" />
          <View style={styles.notesCard}>
            <Text style={styles.notesBody}>{consultationNotes}</Text>
            <Text style={styles.apptMeta}>
              {formatAppointmentDate(appointment.date)} · {appointment.time}
            </Text>
          </View>
        </FadeInView>

        {appointment.priorPrescriptionFile ? (
          <FadeInView delay={120}>
            <SectionTitle title="Previous prescription" />
            <View style={styles.fileCard}>
              <View style={styles.fileIcon}>
                <Ionicons name="document-text" size={22} color={colors.primary} />
              </View>
              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>
                  {appointment.priorPrescriptionFile}
                </Text>
                <Text style={styles.fileSub}>
                  Uploaded before visit · PDF
                </Text>
              </View>
              <Ionicons name="download-outline" size={22} color={colors.primary} />
            </View>
          </FadeInView>
        ) : null}

        {appointment.prescriptionFile ? (
          <FadeInView delay={140}>
            <SectionTitle title="Prescription" />
            <View style={styles.fileCard}>
              <View style={styles.fileIcon}>
                <Ionicons name="document-text" size={22} color={colors.primary} />
              </View>
              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>
                  {appointment.prescriptionFile}
                </Text>
                <Text style={styles.fileSub}>PDF · From hospital</Text>
              </View>
              <Ionicons name="download-outline" size={22} color={colors.primary} />
            </View>
          </FadeInView>
        ) : null}
      </ScrollView>
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
    paddingBottom: 120,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  notesCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  notesBody: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
  },
  apptMeta: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  fileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  fileSub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
});
