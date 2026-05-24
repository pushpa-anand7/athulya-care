import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { radius, shadows, spacing } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
  padding?: 'sm' | 'md' | 'lg';
};

export function Card({
  children,
  onPress,
  style,
  elevated = true,
  padding = 'md',
}: Props) {
  const { colors } = useTheme();

  const content = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        elevated && shadows.card,
        padding === 'sm' && styles.padSm,
        padding === 'lg' && styles.padLg,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  padSm: {
    padding: spacing.sm,
  },
  padLg: {
    padding: spacing.lg,
  },
  pressed: {
    opacity: 0.96,
    transform: [{ scale: 0.99 }],
  },
});
