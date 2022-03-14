import React, { FC, memo } from 'react';
import { VStack, Button } from 'native-base';
import { colors } from '@src/styles';

export type Props = {
  onNavigateQR: () => void;
};

export const HomePresenter: FC<Props> = memo(({ onNavigateQR }) => {
  return (
    <VStack flex={1} bg={colors.White} justifyContent="center">
      <Button onPress={onNavigateQR}>追加</Button>
    </VStack>
  );
});
