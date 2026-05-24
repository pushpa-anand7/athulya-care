import { ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { colors } from '../constants/theme';

type Props = {
  children: ReactNode;
};

/** Centers the app in a phone-sized frame when running in the browser. */
export function WebShell({ children }: Props) {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.page}>
      <View style={styles.phone}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    minHeight: '100vh' as unknown as number,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  phone: {
    width: '100%',
    maxWidth: 430,
    height: '90vh' as unknown as number,
    flex: 1,
    maxHeight: 900,
    backgroundColor: colors.white,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 24,
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
});
