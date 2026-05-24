import { Ionicons } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { DoctorCard } from '../components/DoctorCard';
import { FadeInView } from '../components/FadeInView';
import { OutlinedButton } from '../components/OutlinedButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { SectionTitle } from '../components/SectionTitle';
import { colors, radius, spacing } from '../constants/theme';
import {
  appointments,
  formatAppointmentDate,
  getAppointmentById,
  getDoctorById,
} from '../data/mockData';
import { ConsultStackParamList, MainTabParamList } from '../types/navigation';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ConsultStackParamList, 'ConsultHome'>,
  BottomTabScreenProps<MainTabParamList>
>;

export function ConsultHomeScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const appointmentId =
    route.params?.appointmentId ??
    appointments.find((a) => a.status === 'upcoming')?.id;
  const appointment = appointmentId
    ? getAppointmentById(appointmentId)
    : undefined;
  const doctor = appointment
    ? getDoctorById(appointment.doctorId)
    : undefined;

  if (!appointment || !doctor) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <ScreenHeader title="Consult" />
        <View style={styles.empty}>
          <Ionicons name="medkit-outline" size={48} color={colors.textLight} />
          <AppText variant="h2" style={styles.emptyTitle}>
            No active consultation
          </AppText>
          <AppText variant="caption" muted style={styles.emptySub}>
            Book an appointment to see your consultation details here.
          </AppText>
          <Pressable
            style={styles.bookCta}
            onPress={() => navigation.navigate('BookAppointment')}
          >
            <AppText variant="bodyMedium" color={colors.white}>
              Book appointment
            </AppText>
          </Pressable>
        </View>
      </View>
    );
  }

  const consultationNotes =
    appointment.patientNotes ||
    appointment.notes ||
    'No consultation notes provided.';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader title="Consult" />

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
            <AppText variant="body" muted>
              {consultationNotes}
            </AppText>
            <AppText variant="caption" color={colors.primary} style={styles.meta}>
              {formatAppointmentDate(appointment.date)} · {appointment.time}
            </AppText>
          </View>
        </FadeInView>

        {appointment.priorPrescriptionFile ? (
          <FadeInView delay={120}>
            <SectionTitle title="Previous prescription" />
            <View style={styles.fileCard}>
              <Ionicons name="document-text" size={22} color={colors.primary} />
              <View style={styles.fileInfo}>
                <AppText variant="h3">{appointment.priorPrescriptionFile}</AppText>
                <AppText variant="caption" muted>
                  Uploaded before visit
                </AppText>
              </View>
            </View>
          </FadeInView>
        ) : null}

        {appointment.prescriptionFile ? (
          <FadeInView delay={140}>
            <SectionTitle title="Prescription" />
            <View style={styles.fileCard}>
              <Ionicons name="document-text" size={22} color={colors.primary} />
              <View style={styles.fileInfo}>
                <AppText variant="h3">{appointment.prescriptionFile}</AppText>
                <AppText variant="caption" muted>
                  From hospital
                </AppText>
              </View>
            </View>
          </FadeInView>
        ) : null}
      </ScrollView>

      <Pressable
        style={[styles.bookFab, { bottom: insets.bottom + 88 }]}
        onPress={() => navigation.navigate('BookAppointment')}
      >
        <Ionicons name="add" size={20} color={colors.white} />
        <AppText variant="caption" color={colors.white} style={styles.bookFabText}>
          New booking
        </AppText>
      </Pressable>
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
    paddingBottom: 140,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  notesCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  meta: {
    fontWeight: '600',
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  fileInfo: {
    flex: 1,
    gap: 2,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  emptyTitle: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
  emptySub: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  bookCta: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    borderRadius: radius.md,
  },
  bookFab: {
    position: 'absolute',
    right: spacing.screen,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radius.full,
  },
  bookFabText: {
    fontWeight: '700',
  },
});
