import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';
import { SupportCategory } from '../types/models';

type Props = {
  category: SupportCategory;
  onPress?: () => void;
};

export function CategoryCard({ category, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        name={category.icon as keyof typeof Ionicons.glyphMap}
        size={22}
        color={colors.textMuted}
      />
      <Text style={styles.label}>{category.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: 8,
    minWidth: 100,
  },
  pressed: {
    borderColor: colors.primary,
    backgroundColor: '#EFF6FF',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
});
