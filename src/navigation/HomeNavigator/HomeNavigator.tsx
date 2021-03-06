import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeParamList, HomeKeys } from './route';
import { HomeContainer } from '@src/screens/Home/Home/HomeContainer';
import { QRcodeContainer } from '@src/screens/Home/QRcode/QRcodeContainer';
import { SearchBookContainer } from '@src/screens/Home/SearchBook/SearcBookContainer';
import { BookInfoContainer } from '@src/screens/Home/BookInfo/BookInfoContainer';
import { BookDetailContainer } from '@src/screens/Home/BookDetail/BookDetailContainer';
import { EditBookContainer } from '@src/screens/Home/EditBook/EditBookContainer';

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
        name={HomeKeys.SearchBook}
        component={SearchBookContainer}
      />
      <HomeStack.Screen
        name={HomeKeys.BookInfo}
        component={BookInfoContainer}
      />
      <HomeStack.Screen
        name={HomeKeys.BookDetail}
        component={BookDetailContainer}
      />
      <HomeStack.Screen
        name={HomeKeys.EditBook}
        component={EditBookContainer}
        options={{
          presentation: 'modal',
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
