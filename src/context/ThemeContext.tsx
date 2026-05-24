// Saves and loads user settings: dark mode, text size, and language.
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ColorPalette,
  darkPalette,
  highContrastDark,
  highContrastLight,
  lightPalette,
} from '../constants/colorPalettes';
import { fontFamily, radius, shadows, spacing } from '../constants/theme';

export type LanguageCode = 'en' | 'ta' | 'hi';

type ThemeContextValue = {
  colors: ColorPalette;
  isDark: boolean;
  highContrast: boolean;
  fontScale: number;
  language: LanguageCode;
  minTouchSize: number;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  setHighContrast: (value: boolean) => void;
  setFontScale: (value: number) => void;
  setLanguage: (lang: LanguageCode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Key used to store settings on the phone.
const STORAGE_KEY = '@athulya_theme_prefs';

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start in light mode; user can turn on dark mode in Profile.
  const [isDark, setIsDark] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [language, setLanguage] = useState<LanguageCode>('en');
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      const prefs = JSON.parse(raw) as Partial<{
        isDark: boolean;
        highContrast: boolean;
        fontScale: number;
        language: LanguageCode;
      }>;
      if (prefs.isDark !== undefined) setIsDark(prefs.isDark);
      if (prefs.highContrast !== undefined) setHighContrast(prefs.highContrast);
      if (prefs.fontScale !== undefined) setFontScale(prefs.fontScale);
      if (prefs.language) setLanguage(prefs.language);
    });
  }, []);

  const persist = useCallback(
    (patch: Partial<{
      isDark: boolean;
      highContrast: boolean;
      fontScale: number;
      language: LanguageCode;
    }>) => {
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          isDark,
          highContrast,
          fontScale,
          language,
          ...patch,
        }),
      );
    },
    [fontScale, highContrast, isDark, language],
  );

  const colors = useMemo(() => {
    const base = isDark ? darkPalette : lightPalette;
    const contrast = isDark ? highContrastDark : highContrastLight;
    return highContrast ? { ...base, ...contrast } : base;
  }, [highContrast, isDark]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors,
      isDark,
      highContrast,
      fontScale,
      language,
      minTouchSize: 48,
      setDarkMode: (v) => {
        setIsDark(v);
        persist({ isDark: v });
      },
      toggleDarkMode: () => {
        setIsDark((d) => {
          const next = !d;
          persist({ isDark: next });
          return next;
        });
      },
      setHighContrast: (v) => {
        setHighContrast(v);
        persist({ highContrast: v });
      },
      setFontScale: (v) => {
        setFontScale(v);
        persist({ fontScale: v });
      },
      setLanguage: (lang) => {
        setLanguage(lang);
        persist({ language: lang });
      },
    }),
    [colors, fontScale, highContrast, isDark, language, persist],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

export { fontFamily, radius, shadows, spacing };
