import React, { FC, memo } from 'react';
import { VStack, Button } from 'native-base';

import { Header } from '@src/components';

type Props = {
  onBack: () => void;
  onDeleteUser: () => void;
};

export const AccountPresenter: FC<Props> = memo(({ onBack, onDeleteUser }) => {
  return (
    <>
      <Header title="アカウント情報" onBack={onBack} />
      <VStack flex={1} justifyContent="center">
        <Button onPress={onDeleteUser}>DELETE</Button>
      </VStack>
    </>
  );
});
