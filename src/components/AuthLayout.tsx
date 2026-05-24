import { ReactNode } from 'react';
import {
  Image,
  ImageStyle,
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CurvedCardTop } from './CurvedCardTop';
import { images } from '../constants/images';
import { colors, spacing } from '../constants/theme';

export type AuthVariant = 'welcome' | 'login';
export type LogoPosition = 'center' | 'top-right';

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  imageSource: ImageSourcePropType;
  variant: AuthVariant;
  logoPosition: LogoPosition;
};

export function AuthLayout({
  title,
  subtitle,
  children,
  imageSource,
  variant,
  logoPosition,
}: Props) {
  const { width, height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const heroRatio = variant === 'login' ? 0.48 : 0.58;
  const heroMax = Platform.OS === 'web' ? 410 : 460;
  const heroHeight = Math.min(Math.round(screenHeight * heroRatio), heroMax);
  const heroTopAlign =
    Platform.OS === 'web'
      ? ({ objectPosition: 'top center' } as unknown as ImageStyle)
      : undefined;

  return (
    <View style={styles.root}>
      {/* Photo + word logo; the white curve is part of the photo area. */}
      <View style={[styles.hero, { height: heroHeight }]}>
        <View style={styles.heroPhotoClip}>
          <Image
            source={imageSource}
            style={[styles.heroPhoto, heroTopAlign]}
            resizeMode="cover"
          />
          {variant === 'login' ? (
            <View style={styles.loginNightOverlay} pointerEvents="none" />
          ) : null}
        </View>

        {logoPosition === 'center' ? (
          <View style={styles.wordCenterWrap}>
            <Image
              source={images.word}
              style={styles.wordCenterImg}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Image
            source={images.word}
            style={[styles.wordTopRight, { top: insets.top + spacing.md }]}
            resizeMode="contain"
          />
        )}

        <View style={styles.curveAnchor}>
          <CurvedCardTop variant={variant} width={width} />
        </View>
      </View>

      {/* White form area starts after the curved image separation. */}
      <View style={styles.cardSection}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          <View style={styles.children}>{children}</View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  hero: {
    width: '100%',
    position: 'relative',
    overflow: 'visible',
    backgroundColor: '#b8b8b8',
    zIndex: 1,
  },
  heroPhotoClip: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    backgroundColor: '#b8b8b8',
  },
  heroPhoto: {
    width: '100%',
    height: '100%',
  },
  loginNightOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(5, 12, 30, 0.32)',
  },
  wordCenterWrap: {
    position: 'absolute',
    top: '9%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  wordCenterImg: {
    width: 190,
    height: 76,
  },
  wordTopRight: {
    position: 'absolute',
    right: 6,
    width: 140,
    height: 56,
    zIndex: 2,
  },
  curveAnchor: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    alignItems: 'center',
  },
  cardSection: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 2,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  children: {
    gap: spacing.sm,
  },
});
