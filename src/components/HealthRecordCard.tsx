// One row for a prescription or lab report file in the Reports tab.
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { useTheme } from '../context/ThemeContext';
import { radius, shadows, spacing } from '../constants/theme';
import { HealthRecord } from '../types/models';

type Props = {
  record: HealthRecord;
  onPress?: () => void;
};

export function HealthRecordCard({ record, onPress }: Props) {
  const { colors } = useTheme();
  const iconName =
    record.type === 'prescription'
      ? 'document-text'
      : ('flask' as keyof typeof Ionicons.glyphMap);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        shadows.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.primaryLight }]}>
        <Ionicons name={iconName} size={22} color={colors.primary} />
      </View>
      <View style={styles.info}>
        <AppText variant="h3">{record.title}</AppText>
        <AppText variant="caption" muted>
          {record.subtitle}
        </AppText>
        <AppText variant="caption" color={colors.textLight}>
          {record.dateLabel} · {record.fileType}
        </AppText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
});
