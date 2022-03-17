import React, { memo, FC } from 'react';
import { View, VStack, Button } from 'native-base';
import { useWelcome } from './useWelcome';

type Props = {};

export const WelcomePresenter: FC<Props> = memo(() => {
  return (
    <>
      <VStack flex={1} justifyContent="center" safeArea={false}>
        <Button>登録</Button>
      </VStack>
    </>
  );
});
