import { useSettingsNavigation } from '@src/navigation/SettingsNavigator/route';
import React, { FC, useCallback } from 'react';
import { AccountPresenter } from './AccountPresenter';
import { useAuth, useToast } from '@src/hooks';

export const AccountContainer: FC = () => {
  const navigation = useSettingsNavigation();
  const { deleteUser } = useAuth();
  const { showToast } = useToast();

  const back = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onDeleteUser = useCallback(async () => {
    try {
      await deleteUser();
      showToast({ message: 'アカウントを削除しました', status: 'success' });
    } catch {
      showToast({ message: 'エラーが起きました', status: 'error' });
    }
  }, [deleteUser, showToast]);

  return <AccountPresenter onBack={back} onDeleteUser={onDeleteUser} />;
};
