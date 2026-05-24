import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { images } from '../constants/images';
import { colors } from '../constants/theme';
import { AuthStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

const SPLASH_MS = 5200;

export function SplashScreen({ navigation }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.35)).current;
  const translateY = useRef(new Animated.Value(48)).current;

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 8,
        tension: 35,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 38,
        useNativeDriver: true,
      }),
    ]);

    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 },
    );

    const exit = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 700,
        useNativeDriver: true,
      }),
    ]);

    entrance.start(({ finished }) => {
      if (finished) breathe.start();
    });

    const timer = setTimeout(() => {
      breathe.stop();
      exit.start(() => navigation.replace('Welcome'));
    }, SPLASH_MS);

    return () => {
      clearTimeout(timer);
      entrance.stop();
      breathe.stop();
      exit.stop();
    };
  }, [opacity, scale, translateY, navigation]);

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          styles.logoWrap,
          {
            opacity,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <View style={styles.logoCard}>
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCard: {
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
  },
  logo: {
    width: 260,
    height: 110,
  },
});
