import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

type Props = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  light?: boolean;
  style?: ViewStyle;
};

export function SearchBar({
  placeholder,
  value,
  onChangeText,
  light,
  style,
}: Props) {
  return (
    <View style={[styles.wrap, light && styles.wrapLight, style]}>
      <Ionicons
        name="search"
        size={16}
        color={light ? colors.textMuted : colors.primary}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={light ? colors.textLight : colors.textLight}
        style={[styles.input, light && styles.inputLight]}
        value={value}
        onChangeText={onChangeText}
      />
      <Ionicons
        name="mic"
        size={15}
        color={light ? colors.textMuted : colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  wrapLight: {
    borderWidth: 0,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
  },
  inputLight: {
    fontSize: 13,
  },
});
