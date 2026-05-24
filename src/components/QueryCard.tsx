import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';
import { SupportQuery } from '../types/models';
import { StatusPill } from './StatusPill';

type Props = {
  query: SupportQuery;
  onPress?: () => void;
};

export function QueryCard({ query, onPress }: Props) {
  const variant =
    query.status === 'Resolved'
      ? 'resolved'
      : query.status === 'Open'
        ? 'open'
        : 'progress';

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.top}>
        <Text style={styles.id}>{query.id}</Text>
        <StatusPill label={query.status} variant={variant} />
      </View>
      <Text style={styles.title}>{query.title}</Text>
      <View style={styles.bottom}>
        <Text style={styles.time}>{query.timeAgo}</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  pressed: {
    borderColor: colors.primary,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  id: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 11,
    color: colors.textLight,
  },
});
