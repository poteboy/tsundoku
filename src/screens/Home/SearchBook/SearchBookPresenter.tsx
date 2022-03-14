import React, { FC, memo } from 'react';
import { Header } from '@src/components';
import { View, Button } from 'native-base';

export type Props = {
  onBack: () => void;
  onNavigateQR: () => void;
};

export const SearchBookPresenter: FC<Props> = memo(
  ({ onBack, onNavigateQR }) => {
    return (
      <>
        <Header title="本を探す" onBack={onBack} />
        <View flex={1} justifyContent="center">
          <Button onPress={onNavigateQR}>QRコード</Button>
        </View>
      </>
    );
  },
);
