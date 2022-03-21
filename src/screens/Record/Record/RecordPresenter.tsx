import React, { FC, memo, useEffect } from 'react';
import { View, VStack } from 'native-base';
import { Header } from '@src/components';
import { useAdMob, useRakuten } from '@src/hooks';
import { colors } from '@src/styles';

type Props = {};

export const RecordPresenter: FC<Props> = memo(() => {
  return (
    <>
      <VStack bg={colors.lightGray} flex={1}>
        <Header title="読書記録" />
      </VStack>
    </>
  );
});
