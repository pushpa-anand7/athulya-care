import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';

type Props = { title: string };

export function PlaceholderScreen({ title }: Props) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 76,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  sub: {
    marginTop: spacing.sm,
    color: colors.textMuted,
  },
});
