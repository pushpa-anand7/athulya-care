import { StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Props = {
  size?: number;
};

/** Capsule pill icon for medicine reminders */
export function PillIcon({ size = 22 }: Props) {
  const { colors } = useTheme();
  const height = size * 0.45;
  const width = size * 1.1;

  return (
    <View
      style={[
        styles.capsule,
        {
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: colors.primary,
        },
      ]}
    >
      <View style={[styles.divider, { backgroundColor: colors.white }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  capsule: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-35deg' }],
  },
  divider: {
    width: 1.5,
    height: '70%',
    opacity: 0.35,
  },
});
