import React, { useCallback } from 'react';
import { useTabContext } from '@src/navigation/context';
import { AdMobBanner } from 'expo-ads-admob';
import { StyleProp, ViewStyle } from 'react-native';

export const useAdMob = () => {
  const {
    user: { premium },
  } = useTabContext();

  const unitId = __DEV__
    ? 'ca-app-pub-3940256099942544/6300978111'
    : 'ca-app-pub-3940256099942544/6300978111';

  const showAdMob = useCallback(() => {
    if (!premium) {
      console.log('ad');
    }
  }, [premium]);

  const AdBanner: React.FC<AdProps> = ({ style }) => {
    return !premium ? <AdMobBanner style={style} adUnitID={unitId} /> : <></>;
  };

  return {
    showAdMob,
    AdBanner,
    premium,
  };
};

type AdProps = {
  style?: StyleProp<ViewStyle>;
};
