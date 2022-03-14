import React, { FC, memo } from 'react';
import { VStack, Button } from 'native-base';
import { colors } from '@src/styles';
import { Header } from '@src/components';

export type Props = {
  onNavigateSearchBook: () => void;
};

export const HomePresenter: FC<Props> = memo(({ onNavigateSearchBook }) => {
  return (
    <>
      <Header title="ホーム" />
      <VStack flex={1} bg={colors.White} justifyContent="center">
        <Button onPress={onNavigateSearchBook}>追加</Button>
      </VStack>
    </>
  );
});
