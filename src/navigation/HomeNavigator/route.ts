import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Book, BookInfo, BookSet } from '@src/entities';

export const HomeKeys = {
  Home: 'Home/Home',
  QRcode: 'Home/QRcode',
  SearchBook: 'Home/SearchBook',
  BookInfo: 'Home/BookInfo',
  BookDetail: 'Home/BookDetail',
  EditBook: 'Home/EditBook',
} as const;

export type HomeParamList = {
  [HomeKeys.Home]: undefined;
  [HomeKeys.QRcode]: undefined;
  [HomeKeys.SearchBook]: undefined;
  [HomeKeys.BookInfo]: { bookInfo: BookInfo };
  [HomeKeys.BookDetail]: BookSet;
  [HomeKeys.EditBook]: undefined;
};

export const useHomeNavigation = () =>
  useNavigation<NativeStackNavigationProp<HomeParamList>>();
