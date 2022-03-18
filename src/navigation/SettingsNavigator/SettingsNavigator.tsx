import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsParamList, SettingsKeys } from './route';
import { SettingsHomeContainer } from '@src/screens/Settings/SettingsHome/SettingsHomeContainer';
import { AccountContainer } from '@src/screens/Settings/Account/AccountContainer';

const SettingsStack = createNativeStackNavigator<SettingsParamList>();

export const SettingsStackNavigator: FC = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen
        name={SettingsKeys.SettingsHome}
        component={SettingsHomeContainer}
      />
      <SettingsStack.Screen
        name={SettingsKeys.Account}
        component={AccountContainer}
      />
    </SettingsStack.Navigator>
  );
};
