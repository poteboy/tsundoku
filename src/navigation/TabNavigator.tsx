import React, { FC, useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList, TabKeys } from './route';
import { HomeStackNavigator } from './HomeNavigator/HomeNavigator';
import { RecordStackNavigator } from './RecordNavigator/RecordNavigator';
import { CategoryNavigator } from './CategoryNavigator/CategoryNavigator';
import { SettingsStackNavigator } from './SettingsNavigator/SettingsNavigator';
import { useAuth, BookInfoContainer } from '@src/hooks';
import { User } from '@src/entities';
import { unstable_batchedUpdates } from 'react-native';
import { Box, Spinner } from 'native-base';
import { TabContext } from './context';
import { firestore, collectionPath } from '@src/constants';
import { HomeIcon, MenuIcon, RecordIcon, CategoryIcon } from '@src/icons/tab';
import { colors } from '@src/styles';

const TabStack = createBottomTabNavigator<TabParamList>();
const userRef = firestore.collection(collectionPath.users.users);

export const TabStackNavigator: FC = () => {
  const [user, setUser] = useState<User>();
  const { getUser, userUid, updateUser } = useAuth();
  const userDocRef = userRef.doc(user?.uid);

  // ここらへんの処理はuseAuth
  useEffect(() => {
    (async () => {
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
    <TabContext.Provider value={{ user, userDocRef, bookInfos: [] }}>
      <BookInfoContainer.Provider>
        <TabStack.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { height: 85 },
          }}
        >
          <TabStack.Screen
            name={TabKeys.Home}
            component={HomeStackNavigator}
            options={{
              title: 'ホーム',
              tabBarActiveTintColor: colors.Black,
              tabBarInactiveTintColor: colors.gray,
              tabBarIcon: ({ focused }) => {
                return <HomeIcon focused={focused} size={6} />;
              },
            }}
          />
          <TabStack.Screen
            name={TabKeys.Category}
            component={CategoryNavigator}
            options={{
              title: 'カテゴリー',
              tabBarActiveTintColor: colors.Black,
              tabBarInactiveTintColor: colors.gray,
              tabBarIcon: ({ focused }) => {
                return <CategoryIcon focused={focused} size={6} />;
              },
            }}
          />
          <TabStack.Screen
            name={TabKeys.Record}
            component={RecordStackNavigator}
            options={{
              title: '読書記録',
              tabBarActiveTintColor: colors.Black,
              tabBarInactiveTintColor: colors.gray,
              tabBarIcon: ({ focused }) => {
                return <RecordIcon focused={focused} size={6} />;
              },
            }}
          />
          <TabStack.Screen
            name={TabKeys.Settings}
            component={SettingsStackNavigator}
            options={{
              title: 'メニュー',
              tabBarActiveTintColor: colors.Black,
              tabBarInactiveTintColor: colors.gray,
              tabBarIcon: ({ focused }) => {
                return <MenuIcon focused={focused} size={6} />;
              },
            }}
          />
        </TabStack.Navigator>
      </BookInfoContainer.Provider>
    </TabContext.Provider>
  );
};
