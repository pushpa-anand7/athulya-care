// Doctor info card — used in doctor list, consult page, and booking steps.
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { images } from '../constants/images';
import { colors, radius, shadows, spacing } from '../constants/theme';
import { Doctor } from '../types/models';
import { AppText } from './AppText';

export type DoctorCardProps = {
  doctor: Doctor;
  // list = show Book now button, detail = full card with follow button
  variant?: 'list' | 'detail';
  // compact = smaller card for the schedule screen
  compact?: boolean;
  onPress?: () => void;
  onBook?: () => void;
  showFollow?: boolean;
  onFollow?: () => void;
  following?: boolean;
};

function DoctorCardBody({
  doctor,
  isList,
  compact,
  onBook,
}: {
  doctor: Doctor;
  isList: boolean;
  compact?: boolean;
  onBook?: () => void;
}) {
  return (
    <View style={styles.mainRow}>
      <View style={styles.avatarWrap}>
        <Image
          source={images.doctor}
          style={[styles.avatar, compact && styles.avatarCompact]}
        />
        {doctor.isOnline ? (
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
          </View>
        ) : null}
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <AppText variant="h3" style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {doctor.name}
          </AppText>
          <View style={styles.rating}>
            <Ionicons name="star" size={13} color={colors.yellow} />
            <AppText variant="bodyMedium">{doctor.rating}</AppText>
          </View>
        </View>

        <AppText variant="caption" muted>
          {doctor.specialty} · {doctor.hospital}
        </AppText>

        {!compact ? (
          <>
            <View style={styles.trustRow}>
              <TrustChip icon="ribbon" label={`${doctor.experienceYears} yrs`} />
              <TrustChip icon="people" label={doctor.patientCount} />
              <TrustChip
                icon="chatbubble-ellipses"
                label={`${doctor.reviewCount}`}
              />
            </View>

            <AppText variant="label" style={styles.languages}>
              {doctor.languages.join(' · ')}
            </AppText>

            <View style={styles.availability}>
              <Ionicons
                name={doctor.isOnline ? 'flash' : 'time-outline'}
                size={12}
                color={doctor.isOnline ? colors.green : colors.orange}
              />
              <AppText
                variant="caption"
                color={doctor.isOnline ? colors.green : colors.orange}
              >
                {doctor.isOnline
                  ? `Available in ${doctor.nextAvailable}`
                  : `Next slot · ${doctor.nextAvailable}`}
              </AppText>
            </View>
          </>
        ) : null}
      </View>

      {isList && onBook ? (
        <Pressable style={styles.bookBtn} onPress={onBook}>
          <AppText variant="caption" color={colors.white} style={styles.bookText}>
            Book now
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

export function DoctorCard({
  doctor,
  variant = 'list',
  compact,
  onPress,
  onBook,
  showFollow,
  onFollow,
  following,
}: DoctorCardProps) {
  const isList = variant === 'list' && !compact;

  return (
    <View style={styles.wrap}>
      {onPress ? (
        <Pressable
          style={({ pressed }) => [
            styles.card,
            shadows.card,
            pressed && styles.cardPressed,
          ]}
          onPress={onPress}
        >
          <DoctorCardBody
            doctor={doctor}
            isList={isList}
            compact={compact}
            onBook={onBook}
          />
        </Pressable>
      ) : (
        <View style={[styles.card, shadows.card]}>
          <DoctorCardBody
            doctor={doctor}
            isList={isList}
            compact={compact}
            onBook={onBook}
          />
        </View>
      )}

      {showFollow ? (
        <Pressable
          style={[styles.followBtn, following && styles.followBtnActive]}
          onPress={onFollow}
        >
          <AppText
            variant="caption"
            color={following ? colors.white : colors.primary}
            style={styles.followText}
          >
            {following ? 'Following' : '+ Follow'}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

function TrustChip({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon} size={11} color={colors.textMuted} />
      <AppText variant="label">{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardPressed: {
    borderColor: colors.primary,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
  },
  avatarCompact: {
    width: 56,
    height: 56,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.online,
  },
  info: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flexShrink: 0,
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  languages: {
    marginTop: 2,
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  bookBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignSelf: 'center',
    minHeight: 40,
    justifyContent: 'center',
  },
  bookText: {
    fontWeight: '700',
  },
  followBtn: {
    alignSelf: 'flex-end',
    marginTop: -6,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: colors.surface,
  },
  followBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  followText: {
    fontWeight: '700',
  },
});
