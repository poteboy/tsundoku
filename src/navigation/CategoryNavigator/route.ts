import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Category, BookSet } from '@src/entities';

export const CategoryKeys = {
  Category: 'Category/Category',
  BookList: 'Category/BookList',
  CategorizeBook: 'Category/CategorizeBook',
} as const;

export type CategoryParamList = {
  [CategoryKeys.Category]: undefined;
  [CategoryKeys.BookList]: { category: Category; bookSets: BookSet[] };
  [CategoryKeys.CategorizeBook]: { category: Category };
};

export const useCategoryNavigation = () =>
  useNavigation<NativeStackNavigationProp<CategoryParamList>>();
