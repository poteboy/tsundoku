import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export const CategoryKeys = {
  Category: 'Category/Category',
} as const;

export type CategoryParamList = {
  [CategoryKeys.Category]: undefined;
};

export const useCategoryNavigation = () =>
  useNavigation<NativeStackNavigationProp<CategoryParamList>>();
