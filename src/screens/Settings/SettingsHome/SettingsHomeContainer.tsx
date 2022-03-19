import React, { memo, FC, useMemo } from 'react';
import { SettingsHomePresenter } from './SettingsHomePresenter';
import { Linking } from 'react-native';
import {
  SettingsKeys,
  useSettingsNavigation,
} from '@src/navigation/SettingsNavigator/route';
import { urls } from '@src/constants';

export type MenuItem = {
  title: string;
  onPress: () => void;
};

export const SettingsHomeContainer: FC = () => {
  const navigation = useSettingsNavigation();

  const accountItem: MenuItem = useMemo(() => {
    return {
      title: 'アカウント情報',
      onPress: () => {
        navigation.navigate(SettingsKeys.Account);
      },
    };
  }, [navigation]);

  const twitterItem: MenuItem = useMemo(() => {
    return {
      title: '開発者のTwitter',
      onPress: async () => {
        const supported = await Linking.canOpenURL(urls.twitter);
        if (supported) await Linking.openURL(urls.twitter);
      },
    };
  }, [navigation]);

  const appListItem: MenuItem = useMemo(() => {
    return {
      title: '開発者の他のアプリ',
      onPress: async () => {
        const supported = await Linking.canOpenURL(urls.appList);
        if (supported) await Linking.openURL(urls.appList);
      },
    };
  }, [navigation]);

  const menuItems: MenuItem[] = useMemo(() => {
    return [accountItem, twitterItem, appListItem];
  }, [twitterItem]);

  return <SettingsHomePresenter menuItems={menuItems} />;
};
