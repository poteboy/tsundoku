import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export const HomeKeys = {
  Home: 'Home/Home',
  QRcode: 'Home/QRcode',
  SearchBook: 'Home/SearchBook',
} as const;

export type HomeParamList = {
  [HomeKeys.Home]: undefined;
  [HomeKeys.QRcode]: undefined;
  [HomeKeys.SearchBook]: undefined;
};

export const useHomeNavigation = () =>
  useNavigation<NativeStackNavigationProp<HomeParamList>>();
