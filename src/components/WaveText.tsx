import { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../constants/theme';

type Props = {
  text: string;
  style?: ViewStyle;
  letterStyle?: TextStyle;
  delayOffset?: number;
};

/** Left-to-right wave animation on each letter. */
export function WaveText({
  text,
  style,
  letterStyle,
  delayOffset = 0,
}: Props) {
  const anims = useRef(
    text.split('').map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const loops = anims.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay((delayOffset + index) * 90),
          Animated.timing(anim, {
            toValue: 1,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.delay((text.length - index) * 60),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [anims, delayOffset, text.length]);

  return (
    <View style={[styles.row, style]}>
      {text.split('').map((char, index) => {
        const translateY = anims[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        });
        return (
          <Animated.Text
            key={`${char}-${index}`}
            style={[
              styles.letter,
              letterStyle,
              { transform: [{ translateY }] },
            ]}
          >
            {char === ' ' ? '\u00A0' : char}
          </Animated.Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  letter: {
    fontSize: 42,
    fontWeight: '700',
    color: colors.primary,
  },
});
