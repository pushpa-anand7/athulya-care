// Profile and settings — opened from gear icon on home (not in bottom menu).
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { ScreenHeader } from '../components/ScreenHeader';
import { accessibility, radius, spacing } from '../constants/theme';
import { LanguageCode, useTheme } from '../context/ThemeContext';
import { PATIENT_NAME } from '../data/mockData';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const languages: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'hi', label: 'हिन्दी' },
];

export function ProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const {
    colors,
    isDark,
    highContrast,
    fontScale,
    language,
    toggleDarkMode,
    setHighContrast,
    setFontScale,
    setLanguage,
    minTouchSize,
  } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <ScreenHeader title="Profile & Settings" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={{ backgroundColor: colors.surface }}>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
              <AppText variant="h1" color={colors.primary}>
                {PATIENT_NAME.charAt(0)}
              </AppText>
            </View>
            <View>
              <AppText variant="h2">{PATIENT_NAME}</AppText>
              <AppText variant="caption" muted>
                Athulya Care member
              </AppText>
            </View>
          </View>
        </Card>

        <AppText variant="h3" style={styles.section}>
          Appearance
        </AppText>
        <Card style={{ backgroundColor: colors.surface }}>
          <SettingRow
            label="Dark mode"
            icon="moon"
            minTouchSize={minTouchSize}
            trailing={
              <Switch value={isDark} onValueChange={toggleDarkMode} />
            }
          />
          <SettingRow
            label="High contrast"
            icon="contrast"
            minTouchSize={minTouchSize}
            trailing={
              <Switch value={highContrast} onValueChange={setHighContrast} />
            }
          />
        </Card>

        <AppText variant="h3" style={styles.section}>
          Accessibility
        </AppText>
        <Card style={{ backgroundColor: colors.surface }}>
          <AppText variant="caption" muted style={styles.hint}>
            Text size
          </AppText>
          <View style={styles.scaleRow}>
            {accessibility.fontScales.map((scale) => (
              <Pressable
                key={scale}
                style={[
                  styles.scaleBtn,
                  {
                    minHeight: minTouchSize,
                    backgroundColor:
                      fontScale === scale ? colors.primary : colors.background,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setFontScale(scale)}
              >
                <AppText
                  variant="caption"
                  color={fontScale === scale ? colors.white : colors.text}
                >
                  {scale === 1 ? 'A' : scale === 1.1 ? 'A+' : 'A++'}
                </AppText>
              </Pressable>
            ))}
          </View>
          <SettingRow
            label="Voice support (coming soon)"
            icon="volume-high"
            minTouchSize={minTouchSize}
          />
        </Card>

        <AppText variant="h3" style={styles.section}>
          Language
        </AppText>
        <Card style={{ backgroundColor: colors.surface }}>
          {languages.map((lang) => (
            <Pressable
              key={lang.code}
              style={[styles.langRow, { minHeight: minTouchSize }]}
              onPress={() => setLanguage(lang.code)}
            >
              <AppText variant="body">{lang.label}</AppText>
              {language === lang.code ? (
                <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
              ) : null}
            </Pressable>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

function SettingRow({
  label,
  icon,
  trailing,
  minTouchSize,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  trailing?: React.ReactNode;
  minTouchSize: number;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.settingRow, { minHeight: minTouchSize }]}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <AppText variant="body" style={styles.settingLabel}>
        {label}
      </AppText>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    paddingHorizontal: spacing.screen,
    paddingBottom: 120,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  hint: { marginBottom: spacing.sm },
  scaleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  scaleBtn: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  settingLabel: { flex: 1 },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
});
