import { Ionicons } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { AppText } from '../components/AppText';
import { colors, radius, shadows, spacing } from '../constants/theme';
import { getDoctorById } from '../data/mockData';
import { HeroAppointmentCard } from '../components/HeroAppointmentCard';
import { FadeInView } from '../components/FadeInView';
import {
  AppointmentsStackParamList,
  MainTabParamList,
} from '../types/navigation';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AppointmentsStackParamList, 'AppointmentsList'>,
  BottomTabScreenProps<MainTabParamList>
>;

const week = [
  { day: 'Sun', date: '08' },
  { day: 'Mon', date: '09' },
  { day: 'Tue', date: '10', active: true },
  { day: 'Wed', date: '11' },
  { day: 'Thu', date: '12' },
  { day: 'Fri', date: '13' },
  { day: 'Sat', date: '14' },
];

export function AppointmentsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const doctor = getDoctorById('dr-arjun');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Appointments"
        onBack={() => navigation.getParent()?.navigate('Home')}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <View style={styles.calendarCard}>
          <View style={styles.calendarTop}>
            <View>
              <Text style={styles.month}>May 2026</Text>
              <Text style={styles.weekText}>This week</Text>
            </View>
            <View style={styles.monthActions}>
              <View style={styles.roundIcon}>
                <Ionicons name="chevron-back" size={16} color={colors.textMuted} />
              </View>
              <View style={styles.roundIcon}>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </View>
            </View>
          </View>

          <View style={styles.weekRow}>
            {week.map((item) => (
              <View
                key={item.date}
                style={[styles.dayPill, item.active && styles.dayPillActive]}
              >
                <Text style={[styles.dayText, item.active && styles.dayTextActive]}>
                  {item.day}
                </Text>
                <Text style={[styles.dateText, item.active && styles.dateTextActive]}>
                  {item.date}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <AppText variant="h2" style={styles.sectionTitle}>
          My Appointments
        </AppText>
        {doctor ? (
          <FadeInView>
            <HeroAppointmentCard
              doctor={doctor}
              timeLabel="Tue 10 May · 10:30 AM"
              onJoin={() =>
                navigation.getParent()?.navigate('Consult', {
                  screen: 'VideoConsultation',
                  params: { appointmentId: 'apt-1' },
                })
              }
              onDetails={() =>
                navigation.getParent()?.navigate('Consult', {
                  screen: 'ConsultHome',
                  params: { appointmentId: 'apt-1' },
                })
              }
            />
          </FadeInView>
        ) : null}
      </ScrollView>

      <Pressable
        style={styles.bookButton}
        onPress={() =>
          navigation.getParent()?.navigate('Consult', {
            screen: 'BookAppointment',
          })
        }
      >
        <Ionicons name="add" size={20} color={colors.white} />
        <Text style={styles.bookButtonText}>Book Appointment</Text>
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
    paddingBottom: 160,
  },
  calendarCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.section,
    ...shadows.card,
  },
  calendarTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  month: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  weekText: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  monthActions: {
    flexDirection: 'row',
    gap: 6,
  },
  roundIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayPill: {
    width: 34,
    borderRadius: radius.md,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayPillActive: {
    backgroundColor: colors.primary,
  },
  dayText: {
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 4,
  },
  dayTextActive: {
    color: colors.white,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  dateTextActive: {
    color: colors.white,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  bookButton: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: 86,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
