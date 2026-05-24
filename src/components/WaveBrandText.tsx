import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

const TITLE = 'Athulya';
const SUBTITLE = 'Senior Care';

type Props = {
  titleColor?: string;
  subtitleColor?: string;
};

export function WaveBrandText({
  titleColor = colors.primary,
  subtitleColor = colors.textMuted,
}: Props) {
  const letterAnims = useRef(
    TITLE.split('').map(() => new Animated.Value(0)),
  ).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const wave = Animated.loop(
      Animated.stagger(
        90,
        letterAnims.map((anim) =>
          Animated.sequence([
            Animated.timing(anim, {
              toValue: -10,
              duration: 220,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 220,
              useNativeDriver: true,
            }),
          ]),
        ),
      ),
    );

    wave.start();
    Animated.timing(subtitleFade, {
      toValue: 1,
      duration: 800,
      delay: 300,
      useNativeDriver: true,
    }).start();

    return () => wave.stop();
  }, [letterAnims, subtitleFade]);

  return (
    <View style={styles.wrap}>
      <View style={styles.titleRow}>
        {TITLE.split('').map((letter, index) => (
          <Animated.Text
            key={`${letter}-${index}`}
            style={[
              styles.letter,
              { color: titleColor },
              { transform: [{ translateY: letterAnims[index] }] },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
      <Animated.Text
        style={[styles.subtitle, { color: subtitleColor, opacity: subtitleFade }]}
      >
        {SUBTITLE}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  letter: {
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 6,
    letterSpacing: 1,
  },
});
