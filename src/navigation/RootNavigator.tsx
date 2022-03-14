import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRootNavigation, RootParamList, RootKeys } from './route';
import { TabStackNavigator } from './TabNavigator';

const RootStack = createNativeStackNavigator<RootParamList>();

// Add Authentication & Walkthrough Screens Here
export const RootStackNavigator: FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={RootKeys.Tab} component={TabStackNavigator} />
    </RootStack.Navigator>
  );
};
