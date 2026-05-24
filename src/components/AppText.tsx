import { StyleSheet, Text, TextProps } from 'react-native';
import { typography } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

type Variant = keyof typeof typography;

type Props = TextProps & {
  variant?: Variant;
  color?: string;
  muted?: boolean;
};

export function AppText({
  variant = 'body',
  style,
  color,
  muted,
  ...props
}: Props) {
  const { colors, fontScale } = useTheme();
  const base = typography[variant];
  const fontSize =
    typeof base.fontSize === 'number' ? base.fontSize * fontScale : 14;

  return (
    <Text
      style={[
        base,
        { fontSize, color: colors.text },
        muted && { color: colors.textMuted },
        color ? { color } : null,
        style,
      ]}
      {...props}
    />
  );
}
