// Home screen — greeting, search, wellbeing, quick actions, and shortcuts.
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { CategoryCard } from '../components/CategoryCard';
import { DoctorCarousel } from '../components/DoctorCarousel';
import { FadeInView } from '../components/FadeInView';
import { FloatingQuickAccess } from '../components/FloatingQuickAccess';
import { HeroAppointmentCard } from '../components/HeroAppointmentCard';
import { PillIcon } from '../components/PillIcon';
import { useTheme } from '../context/ThemeContext';
import { radius, shadows, spacing } from '../constants/theme';
import {
  getDoctorById,
  getTopDoctors,
  homeSupportQueries,
  PATIENT_NAME,
} from '../data/mockData';
import { MainTabParamList, RootStackParamList } from '../types/navigation';

type Nav = CompositeNavigationProp<
  BottomTabScreenProps<MainTabParamList, 'Home'>['navigation'],
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = BottomTabScreenProps<MainTabParamList, 'Home'> & {
  navigation: Nav;
};

export function DashboardScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { colors, minTouchSize } = useTheme();
  const upcomingDoctor = getDoctorById('dr-arjun');
  // Parent navigator can open Profile (not in bottom tabs).
  const rootNav = navigation.getParent();
  const firstName = PATIENT_NAME.split(' ')[0];

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + spacing.md }]}
        >
          <FadeInView>
            <View style={styles.headerTop}>
              <View style={styles.profileRow}>
                <View style={[styles.avatar, { backgroundColor: colors.white }]}>
                  <AppText variant="h3" color={colors.primary}>
                    {PATIENT_NAME.charAt(0)}
                  </AppText>
                </View>
                <View>
                  <AppText variant="h2" color={colors.white}>
                    Hi {firstName}!
                  </AppText>
                  <AppText variant="caption" color="rgba(255,255,255,0.9)">
                    How are you feeling today?
                  </AppText>
                </View>
              </View>
              <View style={styles.headerActions}>
                <Pressable
                  hitSlop={12}
                  style={styles.headerIconBtn}
                  accessibilityLabel="Notifications"
                >
                  <Ionicons name="notifications-outline" size={22} color={colors.white} />
                </Pressable>
                <Pressable
                  hitSlop={12}
                  style={styles.headerIconBtn}
                  onPress={() => navigation.navigate('Profile')}
                  accessibilityLabel="Profile and settings"
                >
                  <Ionicons name="settings-outline" size={22} color={colors.white} />
                </Pressable>
              </View>
            </View>

            <View style={[styles.searchBar, shadows.soft, { backgroundColor: colors.white }]}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                placeholder="Search medicines here"
                placeholderTextColor={colors.textLight}
                style={[styles.searchInput, { color: colors.text }]}
              />
              <Ionicons name="mic-outline" size={18} color={colors.textMuted} />
              <Ionicons name="scan-outline" size={18} color={colors.textMuted} />
            </View>

            <AppText variant="h2" color={colors.white} style={styles.wellbeingTitle}>
              {"Today's wellbeing"}
            </AppText>
            <View style={styles.wellbeingRow}>
              <WellbeingCard icon="heart" color={colors.red} value="72" label="Heart-BPM" />
              <WellbeingCard icon="walk" color={colors.primary} value="4.2k" label="Steps - Today" />
              <WellbeingCard icon="water" color={colors.green} value="98" label="Sugar-MG/DL" />
            </View>
          </FadeInView>
        </LinearGradient>

        <View style={styles.body}>
          {upcomingDoctor ? (
            <FadeInView delay={40}>
              <SectionHeader title="Upcoming Appointments" action="See all" />
              <HeroAppointmentCard
                doctor={upcomingDoctor}
                timeLabel="Today · 10:30 AM"
                onJoin={() =>
                  navigation.navigate('Consult', {
                    screen: 'VideoConsultation',
                    params: { appointmentId: 'apt-1' },
                  })
                }
                onDetails={() =>
                  navigation.navigate('Consult', {
                    screen: 'ConsultHome',
                    params: { appointmentId: 'apt-1' },
                  })
                }
              />
            </FadeInView>
          ) : null}

          <FadeInView delay={80}>
            <SectionHeader title="Quick actions" />
            <View style={styles.quickRow}>
              <QuickAction
                label="Book Appointment"
                icon="calendar"
                variant="teal"
                onPress={() =>
                  navigation.navigate('Consult', {
                    screen: 'BookAppointment',
                  })
                }
              />
              <QuickAction
                label="Consult with Doctor"
                icon="medkit"
                variant="primary"
                onPress={() =>
                  navigation.navigate('Consult', {
                    screen: 'ConsultHome',
                    params: { appointmentId: 'apt-1' },
                  })
                }
              />
              <QuickAction
                label="Upload Prescription"
                icon="cloud-upload-outline"
                variant="outline"
                onPress={() => navigation.navigate('Reports')}
              />
            </View>
          </FadeInView>

          <FadeInView delay={120}>
            <SectionHeader title="Medicine Reminders" action="See all" />
            <Card>
              <View style={styles.medRow}>
                <View style={[styles.pillIcon, { backgroundColor: colors.primaryLight }]}>
                  <PillIcon size={22} />
                </View>
                <View style={styles.medInfo}>
                  <AppText variant="h3">Atorvastatin</AppText>
                  <AppText variant="caption" muted>
                    10 mg · 1 tablet
                  </AppText>
                  <AppText variant="caption" color={colors.primary}>
                    After breakfast · 9:00 AM
                  </AppText>
                </View>
                <Pressable
                  style={[styles.medCheck, { borderColor: colors.border }]}
                  hitSlop={8}
                >
                  <Ionicons name="checkmark" size={20} color={colors.textLight} />
                </Pressable>
              </View>
            </Card>
          </FadeInView>

          <FadeInView delay={160}>
            <DoctorCarousel
              title="Top doctors"
              doctors={getTopDoctors()}
              onDoctorPress={(d) =>
                navigation.navigate('Consult', {
                  screen: 'SelectAvailability',
                  params: { doctorId: d.id },
                })
              }
              onSeeAll={() =>
                navigation.navigate('Consult', { screen: 'BookAppointment' })
              }
            />
          </FadeInView>

          <FadeInView delay={200}>
            <SectionHeader title="Support & Queries" />
            <View style={styles.supportGrid}>
              {homeSupportQueries.map((item) => (
                <View key={item.id} style={styles.supportCell}>
                  <CategoryCard
                    category={item}
                    onPress={() => navigation.navigate('Reports')}
                  />
                </View>
              ))}
            </View>
          </FadeInView>
        </View>
      </ScrollView>

      <FloatingQuickAccess onAi={() => rootNav?.navigate('AiAssistant')} />
    </View>
  );
}

function WellbeingCard({
  icon,
  color,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  value: string;
  label: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.wellbeingCard, shadows.card, { backgroundColor: colors.white }]}>
      <Ionicons name={icon} size={18} color={color} />
      <AppText variant="h3">{value}</AppText>
      <AppText variant="label">{label}</AppText>
    </View>
  );
}

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.sectionHeader}>
      <AppText variant="h2">{title}</AppText>
      {action ? (
        <AppText variant="caption" color={colors.primary}>
          {action}
        </AppText>
      ) : null}
    </View>
  );
}

function QuickAction({
  label,
  icon,
  variant = 'outline',
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'teal' | 'outline';
  onPress?: () => void;
}) {
  const { colors, minTouchSize } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const iconBg =
    variant === 'teal'
      ? colors.teal
      : variant === 'primary'
        ? colors.primary
        : colors.border;
  const iconColor =
    variant === 'outline' ? colors.textMuted : colors.white;
  const cardBg =
    variant === 'teal'
      ? 'rgba(20, 184, 166, 0.12)'
      : variant === 'primary'
        ? colors.primaryLight
        : colors.surface;
  const borderColor = variant === 'outline' ? colors.border : 'transparent';

  return (
    <Animated.View style={[styles.quickThird, { transform: [{ scale }] }]}>
      <Pressable
        style={[
          styles.quickCard,
          variant === 'outline' && shadows.card,
          {
            backgroundColor: cardBg,
            borderColor,
            borderWidth: variant === 'outline' ? 1 : 0,
            minHeight: minTouchSize + 36,
          },
        ]}
        onPress={onPress}
        onPressIn={() =>
          Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
        }
      >
        <View style={[styles.quickIconCircle, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
        <AppText
          variant="label"
          style={{ marginTop: 8, textAlign: 'center', fontWeight: '700' }}
        >
          {label}
        </AppText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerIconBtn: {
    minHeight: 44,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  wellbeingTitle: {
    marginBottom: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'NunitoSans_400Regular',
  },
  body: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.section,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  wellbeingRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  wellbeingCard: {
    flex: 1,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  medRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  pillIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medInfo: { flex: 1, gap: 4 },
  medCheck: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.section,
  },
  quickThird: { flex: 1 },
  quickCard: {
    borderRadius: radius.lg,
    padding: spacing.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.section,
  },
  supportCell: {
    width: '48%',
  },
});
