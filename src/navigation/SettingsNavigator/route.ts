import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export const SettingsKeys = {
  SettingsHome: 'Settings/SettingsHome',
  Account: 'Settings/Account',
} as const;

export type SettingsParamList = {
  [SettingsKeys.SettingsHome]: undefined;
  [SettingsKeys.Account]: undefined;
};

export const useSettingsNavigation = () =>
  useNavigation<NativeStackNavigationProp<SettingsParamList>>();
