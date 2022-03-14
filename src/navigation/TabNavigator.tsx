import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList, TabKeys } from './route';
import { HomeStackNavigator } from './HomeNavigator/HomeNavigator';
import { SettingsStackNavigator } from './SettingsNavigator/SettingsNavigator';

const TabStack = createBottomTabNavigator<TabParamList>();

export const TabStackNavigator: FC = () => {
  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name={TabKeys.Home} component={HomeStackNavigator} />
      <TabStack.Screen
        name={TabKeys.Settings}
        component={SettingsStackNavigator}
      />
    </TabStack.Navigator>
  );
};
