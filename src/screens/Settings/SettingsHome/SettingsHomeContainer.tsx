import React, { memo, FC, useMemo } from 'react';
import { SettingsHomePresenter } from './SettingsHomePresenter';
import { TwitterIcon } from '@src/icons';
import { View } from 'native-base';
import {
  SettingsKeys,
  useSettingsNavigation,
} from '@src/navigation/SettingsNavigator/route';

export type MenuItem = {
  Icon: JSX.Element;
  title: string;
  onPress: () => void;
};

export const SettingsHomeContainer: FC = () => {
  const navigation = useSettingsNavigation();

  const twitterItem: MenuItem = useMemo(() => {
    return {
      // Icon: () => {
      //   return (
      //     // <View>
      //     <TwitterIcon />
      //     // </View>
      //   );
      // },
      Icon: <TwitterIcon fill="white" size="sm" />,
      title: '開発者のTwitter',
      onPress: () => {
        navigation.navigate(SettingsKeys.Account);
      },
    };
  }, [navigation]);

  const menuItems: MenuItem[] = useMemo(() => {
    return [twitterItem, twitterItem, twitterItem, twitterItem, twitterItem];
  }, [twitterItem]);

  return <SettingsHomePresenter menuItems={menuItems} />;
};
