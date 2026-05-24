// Grid of time buttons — green = free, grey = taken.
import { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, radius, spacing } from '../constants/theme';
import { SlotStatus, TimeSlot } from '../types/models';

type Props = {
  slots: TimeSlot[];
  selectedId?: string;
  onSelect: (slot: TimeSlot) => void;
};

function slotColors(status: SlotStatus, selected: boolean) {
  if (selected) {
    return { bg: colors.primary, text: colors.white, border: colors.primary };
  }
  switch (status) {
    case 'booked':
      return { bg: colors.slotBooked, text: colors.textLight, border: colors.border };
    case 'few':
      return { bg: colors.slotPending, text: colors.orange, border: '#FDBA74' };
    case 'pending':
      return { bg: colors.slotPending, text: '#B45309', border: '#FCD34D' };
    default:
      return { bg: colors.slotAvailable, text: colors.green, border: '#6EE7B7' };
  }
}

function SlotItem({
  slot,
  selected,
  onSelect,
}: {
  slot: TimeSlot;
  selected: boolean;
  onSelect: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const palette = slotColors(slot.status, selected);
  const disabled = slot.status === 'booked';

  const bounce = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.94,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={[styles.slotWrap, { transform: [{ scale }] }]}>
      <Pressable
        disabled={disabled}
        style={[
          styles.slot,
          {
            backgroundColor: palette.bg,
            borderColor: palette.border,
          },
          disabled && styles.slotDisabled,
        ]}
        onPress={() => {
          bounce();
          onSelect();
        }}
      >
        <Text style={[styles.slotText, { color: palette.text }]}>
          {slot.label}
        </Text>
        {slot.status === 'few' && !selected ? (
          <Text style={styles.fewLabel}>Few left</Text>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

export function TimeSlotPicker({ slots, selectedId, onSelect }: Props) {
  return (
    <View style={styles.grid}>
      {slots.map((slot) => (
        <SlotItem
          key={slot.id}
          slot={slot}
          selected={slot.id === selectedId}
          onSelect={() => onSelect(slot)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  slotWrap: {
    width: '47%',
  },
  slot: {
    borderRadius: radius.md,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  slotDisabled: {
    opacity: 0.55,
  },
  slotText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'NunitoSans_700Bold',
  },
  fewLabel: {
    fontSize: 9,
    color: colors.orange,
    marginTop: 2,
    fontFamily: 'NunitoSans_600SemiBold',
  },
});
