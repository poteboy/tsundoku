import React, { FC, memo, useCallback } from 'react';
import { VStack, Image, View, Fab, Icon, HStack, Pressable } from 'native-base';
import { colors } from '@src/styles';
import { Header, Spacer } from '@src/components';
import { ScrollView, Animated, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BookInfo } from '@src/entities';
import { getImg } from '@src/util/getImg';

export type Props = {
  onNavigateSearchBook: () => void;
  bookInfos: BookInfo[];
};

export const HomePresenter: FC<Props> = memo(
  ({ onNavigateSearchBook, bookInfos }) => {
    console.log(bookInfos);

    return (
      <View flex={1} bg={colors.lightGray}>
        <Header title="ホーム" />
        <ScrollView>
          <VStack height="100%" bg={colors.lightGray} justifyContent="center">
            <Spacer size={4} />
            <HStack flexWrap="wrap">
              {bookInfos.map(bookInfo => (
                <BookInfoItem bookInfo={bookInfo} />
              ))}
            </HStack>
          </VStack>
        </ScrollView>
        <Fab
          position="absolute"
          bottom={8}
          right={4}
          size="sm"
          renderInPortal={false}
          onPress={onNavigateSearchBook}
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="md" />}
        />
      </View>
    );
  },
);

const screenWidth = Dimensions.get('screen').width;
const BookInfoItem: FC<{ bookInfo: BookInfo }> = memo(({ bookInfo }) => {
  const scale = new Animated.Value(1);

  const onPressIn = useCallback(() => {
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 0,
      useNativeDriver: true,
      overshootClamping: true,
    }).start();
  }, []);

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <AnimatedImage
        source={getImg(bookInfo.thumbnail)}
        width={`${screenWidth / 5}px`}
        height={`${(screenWidth / 5) * 1.5}px`}
        resizeMode="contain"
        mt={2}
        ml={`${screenWidth / 25}px`} // 1/5分スペースが余ったさらに5等分
        style={{ transform: [{ scale: scale }] }}
      />
    </Pressable>
  );
});
const AnimatedImage = Animated.createAnimatedComponent(Image);
