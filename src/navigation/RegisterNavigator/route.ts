import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const RegisterKeys = {
  Welcome: 'Register/Welcome',
} as const;

export type RegisterParamList = {
  [RegisterKeys.Welcome]: undefined;
};

export const useRegisterNavigation = () =>
  useNavigation<NativeStackNavigationProp<RegisterParamList>>();
