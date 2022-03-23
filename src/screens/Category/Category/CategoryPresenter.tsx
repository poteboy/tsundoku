import React, { FC, memo, useCallback } from 'react';
import { Header, Spacer, CategoryModal } from '@src/components';
import {
  VStack,
  HStack,
  Text,
  Image,
  Button,
  View,
  Pressable,
} from 'native-base';
import { colors } from '@src/styles';
import { ScrollView, Animated, Alert } from 'react-native';
import {
  Category,
  mockBookSet,
  BookSet,
  BookSetRef,
  isBookSet,
} from '@src/entities';
import { getImg } from '@src/util';
import { useCategory } from '@src/hooks';

type Props = {
  AdBanner: React.FC<any>;
  categories: Category[];
  onOpenModal: () => void;
  onCloseModal: () => void;
  modalOpen: boolean;
  getBookSetFromRef: (ref: BookSetRef) => BookSet;
  onNavigateBookList: (category: Category, bookSets: BookSet[]) => void;
};

export const CategoryPresenter: FC<Props> = memo(
  ({
    AdBanner,
    categories,
    onCloseModal,
    onOpenModal,
    modalOpen,
    getBookSetFromRef,
    onNavigateBookList,
  }) => {
    const { createCategory } = useCategory();
    return (
      <VStack flex={1} bg={colors.lightGray}>
        <Header title="カテゴリー" reverse />
        <ScrollView>
          <Spacer size={16} />
          {categories.map(category => {
            const { bookSetRefs } = category;
            const bookSets = bookSetRefs
              .map(ref => {
                return getBookSetFromRef(ref);
              })
              .filter(isBookSet);
            return (
              <View key={category.uid}>
                <CategoryItem {...{ category, bookSets, onNavigateBookList }} />
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
          新規カテゴリーを作成
        </Button>
        <AdBanner style={{ position: 'absolute', bottom: 0 }} />
        <CategoryModal isOpen={modalOpen} onClose={onCloseModal} />
      </VStack>
    );
  },
);

type CategoryItemProps = {
  category: Category;
  bookSets: BookSet[];
} & Pick<Props, 'onNavigateBookList'>;

const CategoryItem: FC<CategoryItemProps> = memo(
  ({ category, bookSets, onNavigateBookList }) => {
    const navigate = useCallback(() => {
      onNavigateBookList(category, bookSets);
    }, [onNavigateBookList, category, bookSets]);

    const scale = new Animated.Value(1);

    const onPressIn = useCallback(() => {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 40,
        useNativeDriver: true,
      }).start();
    }, [scale]);

    const onPressOut = useCallback(() => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 0,
        useNativeDriver: true,
        overshootClamping: true,
      }).start();
    }, [scale]);

    return (
      <Pressable
        onPress={navigate}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <AnimatedStack
          w="80%"
          borderRadius="10px"
          bg={colors.White}
          alignSelf="center"
          shadow={2}
          style={{ transform: [{ scale: scale }] }}
        >
          <HStack alignItems="center" justifyContent="center">
            <Text py={4} pl={5} fontWeight={600} fontSize="xl">
              {category.name}
              <Text fontWeight={400} fontSize="md">
                ({bookSets.length})
              </Text>
            </Text>
          </HStack>
          <HStack justifyContent="center" mb={4}>
            {bookSets.length > 0 &&
              bookSets.slice(0, 3).map(bookSet => {
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
        </AnimatedStack>
      </Pressable>
    );
  },
);
const AnimatedStack = Animated.createAnimatedComponent(VStack);
