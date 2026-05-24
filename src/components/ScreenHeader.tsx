import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { colors, spacing } from '../constants/theme';

type Props = {
  title: string;
  onBack?: () => void;
  light?: boolean;
};

export function ScreenHeader({ title, onBack, light }: Props) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable onPress={onBack} style={styles.back} hitSlop={8}>
          <Ionicons
            name="arrow-back"
            size={20}
            color={light ? colors.white : colors.text}
          />
        </Pressable>
      ) : (
        <View style={styles.backPlaceholder} />
      )}
      <AppText variant="h2" color={light ? colors.white : colors.text}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  back: {
    padding: 4,
  },
  backPlaceholder: {
    width: 28,
  },
});
