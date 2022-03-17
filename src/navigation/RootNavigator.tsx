import React, { FC, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRootNavigation, RootParamList, RootKeys } from './route';
import { TabStackNavigator } from './TabNavigator';
import { RegisterNavigator } from '@src/navigation/RegisterNavigator/RegisterNavigator';
import { useAuth } from '@src/hooks';

const RootStack = createNativeStackNavigator<RootParamList>();

// Add Authentication & Walkthrough Screens Here
export const RootStackNavigator: FC = () => {
  const { authorized } = useAuth();
  const navigation = useRootNavigation();
  // const initialRouteName = authorized ? RootKeys.Tab : RootKeys.Register;

  // useEffect(() => {
  //   if (authorized) navigation.navigate(RootKeys.Tab);
  // }, [authorized]);

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName={initialRouteName}
      initialRouteName={RootKeys.Tab}
    >
      <RootStack.Screen name={RootKeys.Tab} component={TabStackNavigator} />
      <RootStack.Screen
        name={RootKeys.Register}
        component={RegisterNavigator}
      />
    </RootStack.Navigator>
  );
};
