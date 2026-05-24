import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

type Props = {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
};

export function TagSelector({ tags, selected, onToggle }: Props) {
  return (
    <View style={styles.wrap}>
      {tags.map((tag) => {
        const active = selected.includes(tag);
        return (
          <Pressable
            key={tag}
            style={[styles.tag, active && styles.tagActive]}
            onPress={() => onToggle(tag)}
          >
            <Text style={[styles.text, active && styles.textActive]}>{tag}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  tagActive: {
    borderColor: colors.primary,
    backgroundColor: '#EFF6FF',
  },
  text: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  textActive: {
    color: colors.primary,
  },
});
