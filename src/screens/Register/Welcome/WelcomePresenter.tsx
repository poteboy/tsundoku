import React, { memo, FC } from 'react';
import { View, VStack, Button } from 'native-base';

type Props = {
  onRegisterUser: () => void;
  loadingRegistration: boolean;
};

export const WelcomePresenter: FC<Props> = memo(
  ({ onRegisterUser, loadingRegistration }) => {
    return (
      <>
        <VStack flex={1} justifyContent="center" safeArea={false}>
          <Button onPress={onRegisterUser} disabled={loadingRegistration}>
            登録
          </Button>
        </VStack>
      </>
    );
  },
);
