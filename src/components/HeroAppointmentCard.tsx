// Big card on home for the next upcoming visit.
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import { images } from '../constants/images';
import { radius, shadows, spacing } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { Doctor } from '../types/models';
import { AppText } from './AppText';

type Props = {
  doctor: Doctor;
  timeLabel: string;
  startsIn?: string;
  onJoin: () => void;
  onDetails?: () => void;
};

export function HeroAppointmentCard({
  doctor,
  timeLabel,
  startsIn = 'Starts in 20 min',
  onJoin,
  onDetails,
}: Props) {
  const { colors } = useTheme();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.04,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return (
    <View
      style={[
        styles.card,
        shadows.floating,
        {
          backgroundColor: colors.surface,
          borderColor: colors.primaryLight,
        },
      ]}
    >
      <Pressable style={styles.main} onPress={onDetails}>
        <Image source={images.doctor} style={styles.avatar} />
        <View style={styles.info}>
          <AppText variant="h3">{doctor.name}</AppText>
          <AppText variant="caption" muted>
            {doctor.specialty} · {doctor.hospital}
          </AppText>
          <AppText variant="bodyMedium" color={colors.primary} style={{ marginTop: 4 }}>
            {timeLabel}
          </AppText>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <View
          style={[
            styles.secondaryBtn,
            { borderColor: colors.border, backgroundColor: colors.background },
          ]}
        >
          <Ionicons name="time-outline" size={14} color={colors.primary} />
          <AppText variant="caption" color={colors.primary} style={styles.secondaryText}>
            {startsIn}
          </AppText>
        </View>
        <Animated.View
          style={[styles.joinWrap, { transform: [{ scale: pulse }] }]}
        >
          <Pressable
            style={[styles.joinBtn, { backgroundColor: colors.primary }]}
            onPress={onJoin}
          >
            <Ionicons name="videocam" size={18} color={colors.white} />
            <AppText variant="bodyMedium" color={colors.white}>
              Join Call
            </AppText>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.section,
    borderWidth: 1,
  },
  main: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: 12,
  },
  secondaryText: {
    fontWeight: '700',
  },
  joinWrap: {
    flex: 1.4,
  },
  joinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: radius.md,
    paddingVertical: 12,
    minHeight: 48,
  },
});
