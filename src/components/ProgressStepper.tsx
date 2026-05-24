import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { colors, radius, spacing } from '../constants/theme';

type Props = {
  current: number;
  total?: number;
  labels?: string[];
};

export function ProgressStepper({ current, total = 3, labels }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1;
          const done = step < current;
          const active = step === current;
          return (
            <View key={step} style={styles.stepGroup}>
              <View
                style={[
                  styles.dot,
                  done && styles.dotDone,
                  active && styles.dotActive,
                ]}
              />
              {i < total - 1 ? (
                <View
                  style={[styles.line, done && styles.lineDone]}
                />
              ) : null}
            </View>
          );
        })}
      </View>
      <AppText variant="caption" style={styles.stepText}>
        Step {current} of {total}
        {labels?.[current - 1] ? ` · ${labels[current - 1]}` : ''}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.screen,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
  },
  dotDone: {
    backgroundColor: colors.teal,
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  lineDone: {
    backgroundColor: colors.teal,
  },
  stepText: {
    color: colors.primary,
    fontWeight: '700',
  },
});
