import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryKeys, CategoryParamList } from './route';
import { CategoryContainer } from '@src/screens/Category/Category/CategoryContainer';

const CategoryStack = createNativeStackNavigator<CategoryParamList>();

export const CategoryNavigator: FC = () => {
  return (
    <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStack.Screen
        component={CategoryContainer}
        name={CategoryKeys.Category}
      />
    </CategoryStack.Navigator>
  );
};
