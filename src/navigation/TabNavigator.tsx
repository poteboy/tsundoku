import React, { FC, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList, TabKeys } from './route';
import { HomeStackNavigator } from './HomeNavigator/HomeNavigator';
import { SettingsStackNavigator } from './SettingsNavigator/SettingsNavigator';
import { useAuth } from '@src/hooks';
import { User } from '@src/entities';
import { unstable_batchedUpdates } from 'react-native';
import { Box, Spinner } from 'native-base';
import { TabContext } from './context';

const TabStack = createBottomTabNavigator<TabParamList>();

export const TabStackNavigator: FC = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const { getUser, userUid, updateUser } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const _user = await getUser();
      if (_user) {
        unstable_batchedUpdates(() => {
          setUser(_user);
          updateUser(_user);
        });
      }
    })();
  }, []);

  if (!user) {
    return (
      <Box alignItems="center" justifyContent="center" flex={1}>
        <Spinner />
      </Box>
    );
  }

  return (
    <TabContext.Provider value={{ user }}>
      <TabStack.Navigator screenOptions={{ headerShown: false }}>
        <TabStack.Screen name={TabKeys.Home} component={HomeStackNavigator} />
        <TabStack.Screen
          name={TabKeys.Settings}
          component={SettingsStackNavigator}
        />
      </TabStack.Navigator>
    </TabContext.Provider>
  );
};
