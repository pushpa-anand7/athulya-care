import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AuthLayout } from '../components/AuthLayout';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { SuccessPopup } from '../components/SuccessPopup';
import { images } from '../constants/images';
import { colors, spacing } from '../constants/theme';
import { AuthStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const DEMO_EMAIL = 'demo@athulya.com';
const DEMO_PASSWORD = '123456';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  const goToDashboard = () => {
    setShowWelcome(false);
    const root = navigation.getParent();
    root?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      }),
    );
  };

  const handleLogin = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail && !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (!trimmedEmail) {
      setError('Please enter your email.');
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    if (trimmedEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('Invalid email or password.');
      return;
    }

    setError('');
    setShowWelcome(true);
  };

  return (
    <AuthLayout
      variant="login"
      logoPosition="top-right"
      title="Login"
      imageSource={images.login}
    >
      <InputField
        label="Email/Phone Number"
        placeholder="Enter your Phone number/mail here"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          setError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputField
        label="Password"
        placeholder="Enter your Password here"
        value={password}
        onChangeText={(value) => {
          setPassword(value);
          setError('');
        }}
        secureTextEntry
      />

      <View style={styles.row}>
        <Pressable
          style={styles.remember}
          onPress={() => setRemember((v) => !v)}
        >
          <View style={[styles.checkbox, remember && styles.checked]} />
          <Text style={styles.rememberText}>Remember me</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.forgot}>Forget password</Text>
        </Pressable>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonWrap}>
        <PrimaryButton label="Enter Dashboard" onPress={handleLogin} />
      </View>

      <SuccessPopup
        visible={showWelcome}
        title="Welcome back!"
        message="You have successfully logged in to Athulya Senior Care."
        buttonLabel="Continue to Dashboard"
        onContinue={goToDashboard}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 4,
  },
  checked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rememberText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  forgot: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  error: {
    color: colors.red,
    fontSize: 11,
    marginTop: -2,
  },
  buttonWrap: {
    marginTop: spacing.sm,
  },
});
