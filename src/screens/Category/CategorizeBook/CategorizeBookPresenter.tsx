import React, { FC, memo } from 'react';
import { VStack } from 'native-base';
import { Header } from '@src/components';

export const CategorizeBookPresenter = memo(() => {
  return (
    <VStack>
      <Header title="test" onClose={console.log} />
    </VStack>
  );
});
