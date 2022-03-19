import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecordKeys, RecordParamList } from './route';
import { RecordContainer } from '@src/screens/Record/Record/RecordContainer';

const RecordStack = createNativeStackNavigator<RecordParamList>();

export const RecordStackNavigator: FC = () => {
  return (
    <RecordStack.Navigator screenOptions={{ headerShown: false }}>
      <RecordStack.Screen
        name={RecordKeys.Record}
        component={RecordContainer}
      />
    </RecordStack.Navigator>
  );
};
