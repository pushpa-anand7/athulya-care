// First screen after splash — intro text and button to go to login.
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { AuthLayout } from '../components/AuthLayout';
import { PrimaryButton } from '../components/PrimaryButton';
import { images } from '../constants/images';
import { spacing } from '../constants/theme';
import { AuthStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <AuthLayout
      variant="welcome"
      logoPosition="center"
      title="Welcome"
      subtitle="Track medicines, scan prescriptions, and stay connected with care."
      imageSource={images.welcome}
    >
      <View style={styles.buttonWrap}>
        <PrimaryButton
          label="Continue"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  buttonWrap: {
    marginTop: spacing.sm,
  },
});
