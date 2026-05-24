import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontProvider } from './src/components/FontProvider';
import { WebShell } from './src/components/WebShell';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

function AppContent() {
  const { isDark } = useTheme();
  return (
    <>
      <WebShell>
        <AppNavigator />
      </WebShell>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <FontProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </FontProvider>
    </SafeAreaProvider>
  );
}
