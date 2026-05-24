import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from './AppText';
import { useTheme } from '../context/ThemeContext';
import { radius, shadows, spacing } from '../constants/theme';

type Props = {
  onAi?: () => void;
};

export function FloatingQuickAccess({ onAi }: Props) {
  const { colors, minTouchSize } = useTheme();
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={[styles.wrap, { bottom: insets.bottom + 100 }]}
      pointerEvents="box-none"
    >
      {expanded ? (
        <View style={[styles.menu, shadows.floating, { backgroundColor: colors.glass }]}>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              { minHeight: minTouchSize },
              pressed && { opacity: 0.85 },
            ]}
            onPress={() => {
              onAi?.();
              setExpanded(false);
            }}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.primary }]}>
              <Ionicons name="sparkles" size={20} color={colors.white} />
            </View>
            <AppText variant="caption">AI Assistant</AppText>
          </Pressable>
        </View>
      ) : null}

      <Pressable
        style={({ pressed }) => [
          styles.fab,
          shadows.floating,
          {
            backgroundColor: colors.primary,
            minWidth: minTouchSize,
            minHeight: minTouchSize,
          },
          pressed && { transform: [{ scale: 0.96 }] },
        ]}
        onPress={() => setExpanded((e) => !e)}
        accessibilityRole="button"
        accessibilityLabel="AI assistant quick access"
      >
        <Ionicons
          name={expanded ? 'close' : 'add'}
          size={28}
          color={colors.white}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: spacing.screen,
    alignItems: 'flex-end',
    zIndex: 50,
  },
  menu: {
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    minWidth: 160,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
