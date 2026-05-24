// Calendar grid for picking a day when booking — cell size fits screen width.
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

type Props = {
  monthLabel: string;
  selectedDay: number;
  onSelectDay: (day: number) => void;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function MonthCalendar({ monthLabel, selectedDay, onSelectDay }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const daysInMonth = 31;
  const startOffset = 4;

  const cellSize = useMemo(() => {
    const cardPadding = spacing.sm * 2;
    const available = screenWidth - spacing.screen * 2 - cardPadding;
    return Math.floor(available / 7);
  }, [screenWidth]);

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View>
          <Text style={styles.month}>{monthLabel}</Text>
          <Text style={styles.sub}>Select a date</Text>
        </View>
        <View style={styles.actions}>
          <View style={styles.roundIcon}>
            <Ionicons name="chevron-back" size={16} color={colors.textMuted} />
          </View>
          <View style={styles.roundIcon}>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textMuted}
            />
          </View>
        </View>
      </View>

      <View style={styles.weekdays}>
        {WEEKDAYS.map((d) => (
          <View key={d} style={[styles.weekdayCell, { width: cellSize }]}>
            <Text style={styles.weekday}>{d}</Text>
          </View>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((day, index) =>
          day ? (
            <Pressable
              key={`${day}-${index}`}
              style={[
                styles.day,
                {
                  width: cellSize,
                  height: cellSize,
                },
                selectedDay === day && styles.dayActive,
              ]}
              onPress={() => onSelectDay(day)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day && styles.dayTextActive,
                ]}
              >
                {day}
              </Text>
            </Pressable>
          ) : (
            <View
              key={`empty-${index}`}
              style={{ width: cellSize, height: cellSize }}
            />
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  month: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  sub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 6,
  },
  roundIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdays: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekdayCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekday: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  dayActive: {
    backgroundColor: colors.primary,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  dayTextActive: {
    color: colors.white,
  },
});
