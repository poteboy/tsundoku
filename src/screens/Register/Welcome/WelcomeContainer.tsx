import React, { FC, useCallback } from 'react';
import { WelcomePresenter } from './WelcomePresenter';
import { useAuth, useToast } from '@src/hooks';

export const WelcomeContainer: FC = () => {
  const { registerUser, loadingRegistration } = useAuth();
  const { showToast } = useToast();

  const onRegisterUser = useCallback(async () => {
    await registerUser();
    showToast({ message: 'ユーザー登録が完了しました', status: 'success' });
  }, []);

  return (
    <WelcomePresenter
      onRegisterUser={onRegisterUser}
      loadingRegistration={loadingRegistration}
    />
  );
};
