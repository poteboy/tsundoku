import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsParamList, SettingsKeys } from './route';
import { SettingsHomeContainer } from '@src/screens/Settings/SettingsHome/SettingsHomeContainer';

const SettingsStack = createNativeStackNavigator<SettingsParamList>();

export const SettingsStackNavigator: FC = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: true }}>
      <SettingsStack.Screen
        name={SettingsKeys.SettingsHome}
        component={SettingsHomeContainer}
        options={{
          title: '設定',
          headerShadowVisible: true,
        }}
      />
    </SettingsStack.Navigator>
  );
};
