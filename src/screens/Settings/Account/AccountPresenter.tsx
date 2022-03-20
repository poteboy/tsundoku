import React, { FC, memo } from 'react';
import { VStack, Button, Text } from 'native-base';
import { colors } from '@src/styles';
import { Header } from '@src/components';
import { User } from '@src/entities';
import { convertDate, formatDate } from '@src/util';

type Props = {
  onBack: () => void;
  onDeleteUser: () => void;
  user: User;
};

export const AccountPresenter: FC<Props> = memo(
  ({ onBack, onDeleteUser, user }) => {
    return (
      <>
        <Header title="アカウント情報" onBack={onBack} />
        <VStack flex={1} justifyContent="center" bg={colors.lightGray}>
          <Text>{formatDate(convertDate(user.createdAt))}</Text>
          <Button variant="danger" onPress={onDeleteUser}>
            DELETE
          </Button>
        </VStack>
      </>
    );
  },
);
