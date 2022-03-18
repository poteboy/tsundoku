import React, { FC, memo } from 'react';
import { VStack, Button } from 'native-base';
import { useAuth } from '@src/hooks';

type Props = {};

export const AccountPresenter: FC = memo(() => {
  const { deleteUser } = useAuth();

  return (
    <VStack flex={1} justifyContent="center">
      <Button onPress={deleteUser}>DELETE</Button>
    </VStack>
  );
});
