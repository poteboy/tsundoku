import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryKeys, CategoryParamList } from './route';
import { CategoryContainer } from '@src/screens/Category/Category/CategoryContainer';
import { BookListContainer } from '@src/screens/Category/BookList/BookListContainer';
import { CategorizeBookContainer } from '@src/screens/Category/CategorizeBook/CategorizeBookContainer';

const CategoryStack = createNativeStackNavigator<CategoryParamList>();

export const CategoryNavigator: FC = () => {
  return (
    <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStack.Screen
        component={CategoryContainer}
        name={CategoryKeys.Category}
      />
      <CategoryStack.Screen
        component={BookListContainer}
        name={CategoryKeys.BookList}
      />
      <CategoryStack.Screen
        component={CategorizeBookContainer}
        name={CategoryKeys.CategorizeBook}
        options={{
          presentation: 'fullScreenModal',
        }}
      />
    </CategoryStack.Navigator>
  );
};
