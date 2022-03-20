import { useSettingsNavigation } from '@src/navigation/SettingsNavigator/route';
import React, { FC, useCallback } from 'react';
import { AccountPresenter } from './AccountPresenter';
import { useAuth, useToast } from '@src/hooks';
import { Alert } from 'react-native';
import { useTabContext } from '@src/navigation/context';

export const AccountContainer: FC = () => {
  const navigation = useSettingsNavigation();
  const { deleteUser } = useAuth();
  const { showToast } = useToast();
  const { user } = useTabContext();

  const back = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onDeleteUser = useCallback(async () => {
    Alert.alert(
      '本当に削除しますか？',
      '一度削除したアカウントは復元できません',
      [
        {
          text: '削除する',
          onPress: async () => {
            try {
              await deleteUser();
              showToast({
                message: 'アカウントを削除しました',
                status: 'success',
              });
            } catch {
              showToast({ message: 'エラーが起きました', status: 'error' });
            }
          },
          style: 'destructive',
        },
        {
          text: 'キャンセル',
          style: 'cancel',
        },
      ],
    );
  }, [deleteUser, showToast]);

  return (
    <AccountPresenter user={user} onBack={back} onDeleteUser={onDeleteUser} />
  );
};
