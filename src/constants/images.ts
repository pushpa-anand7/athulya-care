import { ImageSourcePropType } from 'react-native';

export const images: Record<
  'welcome' | 'login' | 'logo' | 'word' | 'doctor',
  ImageSourcePropType
> = {
  welcome: require('../../assets/welcome.jpg'),
  login: require('../../assets/login.jpg'),
  logo: require('../../assets/logo.png'),
  word: require('../../assets/word.png'),
  doctor: require('../../assets/doctor.jpg'),
};
