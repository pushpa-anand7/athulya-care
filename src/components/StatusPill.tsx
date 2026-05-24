import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../constants/theme';

type Props = {
  label: string;
  variant?: 'progress' | 'resolved' | 'open';
};

export function StatusPill({ label, variant = 'progress' }: Props) {
  const bg =
    variant === 'resolved'
      ? '#D1FAE5'
      : variant === 'open'
        ? '#FEF3C7'
        : '#DBEAFE';
  const color =
    variant === 'resolved'
      ? colors.green
      : variant === 'open'
        ? '#B45309'
        : colors.primary;

  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
  },
});
