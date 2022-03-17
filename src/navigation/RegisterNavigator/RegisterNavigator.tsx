import React, { FC } from 'react';
import {
  useRegisterNavigation,
  RegisterKeys,
  RegisterParamList,
} from './route';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeContainer } from '@src/screens/Register/Welcome/WelcomeContainer';

const RegisterStack = createNativeStackNavigator<RegisterParamList>();

export const RegisterNavigator: FC = () => {
  return (
    <RegisterStack.Navigator screenOptions={{ headerShown: false }}>
      <RegisterStack.Screen
        component={WelcomeContainer}
        name={RegisterKeys.Welcome}
      />
    </RegisterStack.Navigator>
  );
};
