import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeParamList, HomeKeys } from './route';
import { HomeContainer } from '@src/screens/Home/Home/HomeContainer';
import { QRcodeContainer } from '@src/screens/Home/QRcode/QRcodeContainer';

const HomeStack = createNativeStackNavigator<HomeParamList>();

export const HomeStackNavigator: FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name={HomeKeys.Home}
        component={HomeContainer}
        options={{
          title: 'ホーム',
          headerShadowVisible: true,
        }}
      />
      <HomeStack.Screen
        name={HomeKeys.QRcode}
        component={QRcodeContainer}
        options={{
          presentation: 'fullScreenModal',
        }}
      />
    </HomeStack.Navigator>
  );
};
