import Svg, { Path } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

export const CURVE_HEIGHT = {
  welcome: 118,
  login: 104,
} as const;

type Variant = 'welcome' | 'login';

type Props = {
  variant: Variant;
  width: number;
};

/**
 * White curve: higher on the left, dips toward the right (matches mockup).
 * Fills everything below the curve line.
 */
export function CurvedCardTop({ variant, width }: Props) {
  const h = CURVE_HEIGHT[variant];
  const w = width;

  // Large white filled curve that overlays the bottom of the image.
  const path =
    variant === 'welcome'
      ? `M0,32 C${w * 0.2},34 ${w * 0.36},54 ${w * 0.5},82 C${w * 0.65},110 ${w * 0.82},112 ${w},98 L${w},${h} L0,${h} Z`
      : `M0,22 C${w * 0.2},24 ${w * 0.38},42 ${w * 0.52},68 C${w * 0.66},94 ${w * 0.82},98 ${w},82 L${w},${h} L0,${h} Z`;

  return (
    <View style={[styles.wrap, { width: w, height: h }]}>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <Path d={path} fill="#FFFFFF" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    zIndex: 3,
  },
});
