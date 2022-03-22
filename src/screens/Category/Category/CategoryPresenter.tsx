import React, { FC, memo } from 'react';
import { Header, Spacer, CategoryModal } from '@src/components';
import { VStack, HStack, Text, Image, Button, View } from 'native-base';
import { colors } from '@src/styles';
import { ScrollView } from 'react-native';
import { Category, mockBookSet } from '@src/entities';
import { getImg } from '@src/util';
import { useCategory } from '@src/hooks';

type Props = {
  AdBanner: React.FC<any>;
  categories: Category[];
  onOpenModal: () => void;
  onCloseModal: () => void;
  modalOpen: boolean;
};

export const CategoryPresenter: FC<Props> = memo(
  ({ AdBanner, categories, onCloseModal, onOpenModal, modalOpen }) => {
    const { createCategory } = useCategory();
    return (
      <VStack flex={1} bg={colors.lightGray}>
        <Header title="カテゴリー" />
        <ScrollView>
          <Spacer size={16} />
          {categories.map(category => {
            return (
              <View key={category.uid}>
                <CategoryItem category={category} />
                <Spacer size={16} />
              </View>
            );
          })}
        </ScrollView>
        <Button
          alignSelf="center"
          py={4}
          px={6}
          bottom={20}
          shadow={3}
          _text={{ fontSize: 'lg' }}
          onPress={onOpenModal}
        >
          新規カテゴリを作成
        </Button>
        <AdBanner style={{ position: 'absolute', bottom: 0 }} />
        <CategoryModal isOpen={modalOpen} onClose={onCloseModal} />
      </VStack>
    );
  },
);

type CategoryItemProps = {
  category: Category;
};

const CategoryItem: FC<CategoryItemProps> = memo(({ category }) => {
  const { bookSets } = category;
  return (
    <VStack
      w="80%"
      borderRadius="10px"
      bg={colors.White}
      alignSelf="center"
      shadow={2}
    >
      <HStack alignItems="center" justifyContent="center">
        <Text py={4} pl={5} fontWeight={600} fontSize="xl">
          {category.name}
          <Text fontWeight={400} fontSize="md">
            ({category.bookSets.length})
          </Text>
        </Text>
      </HStack>
      <HStack justifyContent="center" mb={4}>
        {bookSets.slice(0, 3).map(bookSet => {
          return (
            <Image
              source={getImg(bookSet.bookInfo.imgUrl)}
              height="80px"
              width="80px"
              resizeMode="contain"
            />
          );
        })}
      </HStack>
    </VStack>
  );
});
