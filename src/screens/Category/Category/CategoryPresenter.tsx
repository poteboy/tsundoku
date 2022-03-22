import React, { FC, memo } from 'react';
import { Header, Spacer } from '@src/components';
import { VStack, HStack, Text, Image } from 'native-base';
import { colors } from '@src/styles';
import { ScrollView } from 'react-native';
import { Category, mockBookSet } from '@src/entities';
import { getImg } from '@src/util';

type Props = {
  AdBanner: React.FC<any>;
};

export const CategoryPresenter: FC<Props> = memo(({ AdBanner }) => {
  return (
    <VStack flex={1} bg={colors.lightGray}>
      <Header title="カテゴリー" />
      <ScrollView>
        <Spacer size={16} />
        <CategoryItem />
        <Spacer size={16} />
      </ScrollView>
      <AdBanner />
    </VStack>
  );
});

type CategoryItemProps = {
  category?: Category;
};

const CategoryItem: FC<CategoryItemProps> = memo(() => {
  const { book, bookInfo } = mockBookSet;

  return (
    <VStack w="80%" borderRadius="10px" bg={colors.White} alignSelf="center">
      <HStack alignItems="center" justifyContent="center">
        <Text py={4} pl={5} fontWeight={600} fontSize="xl">
          すべて
          <Text fontWeight={400} fontSize="md">
            (1)
          </Text>
        </Text>
      </HStack>
      <HStack justifyContent="center" mb={4}>
        <Image
          source={getImg(bookInfo.imgUrl)}
          height="80px"
          width="80px"
          resizeMode="contain"
        />
        <Image
          source={getImg(bookInfo.imgUrl)}
          height="80px"
          width="80px"
          resizeMode="contain"
        />
        <Image
          source={getImg(bookInfo.imgUrl)}
          height="80px"
          width="80px"
          resizeMode="contain"
        />
      </HStack>
    </VStack>
  );
});
