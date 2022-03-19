import React, { FC, memo } from 'react';
import { VStack, Button } from 'native-base';
import { colors } from '@src/styles';
import { Header } from '@src/components';

type Props = {
  onBack: () => void;
  onDeleteUser: () => void;
};

export const AccountPresenter: FC<Props> = memo(({ onBack, onDeleteUser }) => {
  return (
    <>
      <Header title="アカウント情報" onBack={onBack} />
      <VStack flex={1} justifyContent="center" bg={colors.lightGray}>
        <Button variant="danger" onPress={onDeleteUser}>
          DELETE
        </Button>
      </VStack>
    </>
  );
});
