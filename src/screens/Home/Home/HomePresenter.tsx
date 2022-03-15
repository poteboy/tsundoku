import React, { FC, memo } from 'react';
import { VStack, Button, View } from 'native-base';
import { colors } from '@src/styles';
import { Header } from '@src/components';
import { ScrollView } from 'react-native';

export type Props = {
  onNavigateSearchBook: () => void;
};

export const HomePresenter: FC<Props> = memo(({ onNavigateSearchBook }) => {
  return (
    <View flex={1} bg={colors.White}>
      <Header title="ホーム" />
      <ScrollView>
        <VStack height="100%" bg={colors.White} justifyContent="center">
          <></>
        </VStack>
      </ScrollView>
      <Button
        width="80%"
        alignSelf="center"
        position="absolute"
        bottom={20}
        onPress={onNavigateSearchBook}
        px={16}
        py={2}
        _text={{ fontSize: 'lg' }}
        shadow={4}
      >
        追加
      </Button>
    </View>
  );
});
