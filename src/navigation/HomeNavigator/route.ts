import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Book } from '@src/entities';

export const HomeKeys = {
  Home: 'Home/Home',
  QRcode: 'Home/QRcode',
  SearchBook: 'Home/SearchBook',
  BookInfo: 'Home/BookInfo',
} as const;

export type HomeParamList = {
  [HomeKeys.Home]: undefined;
  [HomeKeys.QRcode]: undefined;
  [HomeKeys.SearchBook]: undefined;
  [HomeKeys.BookInfo]: { bookInfo: Book };
};

export const useHomeNavigation = () =>
  useNavigation<NativeStackNavigationProp<HomeParamList>>();
