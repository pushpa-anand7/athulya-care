import { StyleSheet, Text } from 'react-native';
import { colors } from '../constants/theme';

type Props = {
  step: number;
  total?: number;
};

export function StepLabel({ step, total = 3 }: Props) {
  return (
    <Text style={styles.label}>
      Step {step} of {total}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
});
