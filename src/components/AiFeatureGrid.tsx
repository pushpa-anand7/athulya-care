import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { radius, spacing } from '../constants/theme';
import { AppText } from './AppText';
import { useTheme } from '../context/ThemeContext';

type Feature = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  color: string;
};

type Props = {
  onFeaturePress: (id: string) => void;
};

const features: Feature[] = [
  {
    id: 'symptom',
    icon: 'body',
    title: 'Symptom checker',
    subtitle: 'AI triage',
    color: '#4F8CFF',
  },
  {
    id: 'chat',
    icon: 'chatbubble-ellipses',
    title: 'Health chat',
    subtitle: 'Ask anything',
    color: '#14B8A6',
  },
  {
    id: 'scanner',
    icon: 'scan',
    title: 'Medicine scan',
    subtitle: 'Verify dose',
    color: '#8B5CF6',
  },
  {
    id: 'report',
    icon: 'document-text',
    title: 'Report summary',
    subtitle: 'Plain language',
    color: '#F97316',
  },
];

export function AiFeatureGrid({ onFeaturePress }: Props) {
  const { colors, minTouchSize } = useTheme();

  return (
    <View style={styles.grid}>
      {features.map((f) => (
        <Pressable
          key={f.id}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              minHeight: minTouchSize + 24,
            },
            pressed && { borderColor: colors.primary },
          ]}
          onPress={() => onFeaturePress(f.id)}
        >
          <View style={[styles.icon, { backgroundColor: `${f.color}22` }]}>
            <Ionicons name={f.icon} size={22} color={f.color} />
          </View>
          <AppText variant="bodyMedium" numberOfLines={1}>
            {f.title}
          </AppText>
          <AppText variant="label" muted numberOfLines={1}>
            {f.subtitle}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.section,
  },
  card: {
    width: '48%',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    gap: 6,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
});
