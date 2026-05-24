// Horizontal scroll of doctor cards on the home screen.
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { images } from '../constants/images';
import { radius, shadows, spacing } from '../constants/theme';
import { Doctor } from '../types/models';
import { AppText } from './AppText';
import { useTheme } from '../context/ThemeContext';

type Props = {
  title: string;
  doctors: Doctor[];
  onDoctorPress: (doctor: Doctor) => void;
  onSeeAll?: () => void;
};

export function DoctorCarousel({
  title,
  doctors,
  onDoctorPress,
  onSeeAll,
}: Props) {
  const { colors, minTouchSize } = useTheme();

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <AppText variant="h2">{title}</AppText>
        {onSeeAll ? (
          <Pressable onPress={onSeeAll} hitSlop={12}>
            <AppText variant="caption" color={colors.primary}>
              See all
            </AppText>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {doctors.map((doctor) => (
          <Pressable
            key={doctor.id}
            style={({ pressed }) => [
              styles.card,
              shadows.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                minHeight: minTouchSize + 80,
              },
              pressed && { borderColor: colors.primary },
            ]}
            onPress={() => onDoctorPress(doctor)}
          >
            <Image source={images.doctor} style={styles.avatar} />
            {doctor.isOnline ? (
              <View style={[styles.online, { backgroundColor: colors.online }]} />
            ) : null}
            <AppText variant="h3" numberOfLines={1}>
              {doctor.name.replace('Dr. ', '')}
            </AppText>
            <AppText variant="caption" muted numberOfLines={1}>
              {doctor.specialty}
            </AppText>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color={colors.yellow} />
              <AppText variant="caption">{doctor.rating}</AppText>
              <AppText variant="label">· {doctor.nextAvailable}</AppText>
            </View>
            <View style={[styles.bookChip, { backgroundColor: colors.primaryLight }]}>
              <AppText variant="label" color={colors.primary}>
                Book
              </AppText>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.section,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  scroll: {
    gap: spacing.md,
    paddingRight: spacing.screen,
  },
  card: {
    width: 156,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  online: {
    position: 'absolute',
    top: spacing.md + 48,
    right: spacing.md + 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  bookChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.full,
    marginTop: 'auto',
  },
});
