import { useFocusEffect } from '@react-navigation/native';
import { ReactNode, useCallback, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type Variant = 'fadeUp' | 'fadeDown' | 'fade';

type Props = {
  children: ReactNode;
  variant?: Variant;
};

export function AnimatedTabScreen({ children, variant = 'fadeUp' }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(
    new Animated.Value(variant === 'fadeDown' ? -18 : 22),
  ).current;

  useFocusEffect(
    useCallback(() => {
      const startY = variant === 'fadeDown' ? -18 : variant === 'fadeUp' ? 22 : 0;

      opacity.setValue(0);
      translateY.setValue(startY);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 70,
          useNativeDriver: true,
        }),
      ]).start();
    }, [opacity, translateY, variant]),
  );

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
