import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const fadeTransition: NativeStackNavigationOptions = {
  animation: 'fade',
  animationDuration: 280,
};

export const slideFromRight: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  animationDuration: 300,
};

export const slideFromBottom: NativeStackNavigationOptions = {
  animation: 'slide_from_bottom',
  animationDuration: 320,
};

export const modalFromBottom: NativeStackNavigationOptions = {
  animation: 'slide_from_bottom',
  presentation: 'modal',
  animationDuration: 340,
};
