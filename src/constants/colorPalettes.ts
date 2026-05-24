// Light and dark color sets for ThemeContext.

export type ColorPalette = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  white: string;
  text: string;
  textMuted: string;
  textLight: string;
  border: string;
  teal: string;
  tealDark: string;
  tealGradientStart: string;
  tealGradientEnd: string;
  lightBlue: string;
  red: string;
  green: string;
  orange: string;
  yellow: string;
  slotBooked: string;
  slotPending: string;
  slotAvailable: string;
  online: string;
  overlay: string;
  glass: string;
};

export const lightPalette: ColorPalette = {
  primary: '#4F8CFF',
  primaryDark: '#3A7BFF',
  primaryLight: '#E8F1FF',
  background: '#F7FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  white: '#FFFFFF',
  text: '#1E293B',
  textMuted: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  teal: '#14B8A6',
  tealDark: '#0D9488',
  tealGradientStart: '#4F8CFF',
  tealGradientEnd: '#3A7BFF',
  lightBlue: '#93C5FD',
  red: '#EF4444',
  green: '#22C55E',
  orange: '#F97316',
  yellow: '#FBBF24',
  slotBooked: '#F1F5F9',
  slotPending: '#FFEDD5',
  slotAvailable: '#D1FAE5',
  online: '#22C55E',
  overlay: 'rgba(15, 23, 42, 0.45)',
  glass: 'rgba(255, 255, 255, 0.92)',
};

export const darkPalette: ColorPalette = {
  primary: '#4F8CFF',
  primaryDark: '#3A7BFF',
  primaryLight: '#1E3A5F',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceElevated: '#334155',
  white: '#F8FAFC',
  text: '#F1F5F9',
  textMuted: '#94A3B8',
  textLight: '#64748B',
  border: '#334155',
  teal: '#2DD4BF',
  tealDark: '#14B8A6',
  tealGradientStart: '#3A7BFF',
  tealGradientEnd: '#1E40AF',
  lightBlue: '#60A5FA',
  red: '#F87171',
  green: '#4ADE80',
  orange: '#FB923C',
  yellow: '#FACC15',
  slotBooked: '#334155',
  slotPending: '#422006',
  slotAvailable: '#14532D',
  online: '#4ADE80',
  overlay: 'rgba(0, 0, 0, 0.55)',
  glass: 'rgba(30, 41, 59, 0.88)',
};

export const highContrastLight: Partial<ColorPalette> = {
  text: '#0F172A',
  textMuted: '#334155',
  border: '#475569',
};

export const highContrastDark: Partial<ColorPalette> = {
  text: '#FFFFFF',
  textMuted: '#CBD5E1',
  border: '#94A3B8',
};
