// Custom bottom menu with blue bar and white pill on the active tab.
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from './AppText';
import { useTheme } from '../context/ThemeContext';
import { radius, shadows, spacing } from '../constants/theme';

// These screens belong to the Consult tab (keeps Consult tab highlighted).
const consultRoutes = new Set([
  'ConsultHome',
  'BookAppointment',
  'DoctorList',
  'SelectAvailability',
  'AppointmentDetails',
  'VideoConsultation',
  'CallEnded',
]);

// Hide bottom menu during full-screen video call.
const hideTabBarRoutes = new Set(['VideoConsultation', 'CallEnded']);

const tabs: {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  label: string;
}[] = [
  { name: 'Home', icon: 'home-outline', activeIcon: 'home', label: 'Home' },
  {
    name: 'Appointments',
    icon: 'calendar-outline',
    activeIcon: 'calendar',
    label: 'Visits',
  },
  {
    name: 'Consult',
    icon: 'medkit-outline',
    activeIcon: 'medkit',
    label: 'Consult',
  },
  {
    name: 'Reports',
    icon: 'folder-outline',
    activeIcon: 'folder',
    label: 'Reports',
  },
  {
    name: 'Support',
    icon: 'headset-outline',
    activeIcon: 'headset',
    label: 'Support',
  },
];

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors, minTouchSize } = useTheme();
  const insets = useSafeAreaInsets();
  const currentRoute = state.routes[state.index]?.name;
  const nestedState = state.routes[state.index]?.state;
  const nestedRoute =
    nestedState?.routes?.[nestedState.index ?? 0]?.name ?? undefined;

  if (hideTabBarRoutes.has(nestedRoute ?? '')) {
    return null;
  }

  const isConsultFlow =
    currentRoute === 'Consult' &&
    nestedRoute &&
    nestedRoute !== 'ConsultHome';

  return (
    <View style={[styles.wrapper, { bottom: Math.max(insets.bottom, 12) }]}>
      <View style={[styles.bar, shadows.floating, { backgroundColor: colors.primary }]}>
        {tabs.map((tab) => {
          const focused =
            currentRoute === tab.name ||
            (tab.name === 'Appointments' && nestedRoute === 'AppointmentsList') ||
            (tab.name === 'Consult' && consultRoutes.has(nestedRoute ?? '')) ||
            (tab.name === 'Support' && nestedRoute === 'SupportHome') ||
            (tab.name === 'Reports' &&
              ['ReportsHome', 'HealthRecordsHistory', 'HealthRecordDetail'].includes(
                nestedRoute ?? '',
              ));

          const onPress = () => {
            if (
              tab.name === 'Consult' &&
              isConsultFlow &&
              nestedRoute !== 'ConsultHome'
            ) {
              navigation.navigate('Consult', { screen: 'ConsultHome' });
              return;
            }
            navigation.navigate(tab.name);
          };

          return (
            <Pressable
              key={tab.name}
              onPress={onPress}
              style={styles.tab}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
            >
              {focused ? (
                <View style={[styles.activePill, { backgroundColor: colors.white }]}>
                  <Ionicons name={tab.activeIcon} size={16} color={colors.primary} />
                  <AppText
                    variant="label"
                    color={colors.primary}
                    style={styles.activeLabel}
                    numberOfLines={1}
                  >
                    {tab.label}
                  </AppText>
                </View>
              ) : (
                <View style={[styles.iconOnly, { minHeight: minTouchSize }]}>
                  <Ionicons
                    name={tab.icon}
                    size={18}
                    color="rgba(255,255,255,0.75)"
                  />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.sm,
    right: spacing.sm,
  },
  bar: {
    flexDirection: 'row',
    borderRadius: radius.xl,
    paddingVertical: 6,
    paddingHorizontal: 4,
    minHeight: 60,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: radius.full,
    paddingHorizontal: 8,
    paddingVertical: 7,
    maxWidth: '100%',
  },
  activeLabel: {
    fontWeight: '700',
    fontSize: 9,
  },
  iconOnly: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
});
