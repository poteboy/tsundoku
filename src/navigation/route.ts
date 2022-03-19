import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

// RootStack
export const RootKeys = {
  Tab: 'Root/Tab',
  Register: 'Root/Register',
} as const;

export type RootParamList = {
  [RootKeys.Tab]: undefined;
  [RootKeys.Register]: undefined;
};

export const useRootNavigation = () =>
  useNavigation<NativeStackNavigationProp<RootParamList>>();

// TabStack
export const TabKeys = {
  Home: 'Tab/Home',
  Record: 'Tab/Record',
  Settings: 'Tab/Settings',
} as const;

export type TabParamList = {
  [TabKeys.Home]: undefined;
  [TabKeys.Record]: undefined;
  [TabKeys.Settings]: undefined;
};

export const useTabNavigation = () =>
  useNavigation<BottomTabNavigationProp<TabParamList>>();
