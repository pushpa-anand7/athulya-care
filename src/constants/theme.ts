import { TextStyle, ViewStyle } from 'react-native';
import { lightPalette } from './colorPalettes';

/** @deprecated Prefer useTheme().colors — kept for gradual migration */
export const colors = lightPalette;

/** Teal → forest green hero cards (book appointment, support) */
export const heroGradient = ['#00BFA5', '#004D40'] as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  section: 28,
  screen: 20,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

export const accessibility = {
  minTouchTarget: 48,
  fontScales: [1, 1.1, 1.2] as const,
};

export const typography = {
  h1: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'NunitoSans_700Bold',
  } as TextStyle,
  h2: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'NunitoSans_700Bold',
  } as TextStyle,
  h3: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'NunitoSans_600SemiBold',
  } as TextStyle,
  body: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'NunitoSans_400Regular',
  } as TextStyle,
  bodyMedium: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'NunitoSans_600SemiBold',
  } as TextStyle,
  caption: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'NunitoSans_500Medium',
  } as TextStyle,
  label: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'NunitoSans_600SemiBold',
  } as TextStyle,
};

export const shadows = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  } as ViewStyle,
  floating: {
    shadowColor: '#3A7BFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  } as ViewStyle,
  soft: {
    shadowColor: '#4F8CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  } as ViewStyle,
};

export const fontFamily = {
  regular: 'NunitoSans_400Regular',
  medium: 'NunitoSans_500Medium',
  semiBold: 'NunitoSans_600SemiBold',
  bold: 'NunitoSans_700Bold',
};
