import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius } from '../constants/theme';

type Props = {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  filled?: boolean;
};

export function OutlinedButton({
  label,
  onPress,
  icon,
  style,
  filled,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        filled && styles.filled,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={16}
          color={filled ? colors.white : colors.primary}
        />
      ) : null}
      <Text style={[styles.label, filled && styles.labelFilled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: 11,
  },
  filled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.9,
  },
  label: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  labelFilled: {
    color: colors.white,
  },
});
