import React, { FC, memo, useCallback } from 'react';
import { VStack, Image, View, Fab, Icon, HStack, Pressable } from 'native-base';
import { colors } from '@src/styles';
import { Header, Spacer } from '@src/components';
import { ScrollView, Animated, Dimensions, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BookInfo } from '@src/entities';
import { getImg } from '@src/util';

export type Props = {
  onNavigateSearchBook: () => void;
  bookInfos: BookInfo[];
  onFetchBookInfo: () => void;
  fetching: boolean;
  onNavigateBookDetail: (bookInfo: BookInfo) => void;
};

export const HomePresenter: FC<Props> = memo(
  ({
    onNavigateSearchBook,
    bookInfos,
    onFetchBookInfo,
    fetching,
    onNavigateBookDetail,
  }) => {
    return (
      <View flex={1} bg={colors.lightGray}>
        <Header title="ホーム" />
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onFetchBookInfo} refreshing={fetching} />
          }
        >
          <VStack height="100%" bg={colors.lightGray} justifyContent="center">
            <Spacer size={4} />
            <HStack flexWrap="wrap">
              {bookInfos.map(bookInfo => (
                <BookInfoItem
                  onNavigateBookDetail={onNavigateBookDetail}
                  bookInfo={bookInfo}
                  key={bookInfo.uid}
                />
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

// onNavigateBookDetail

const screenWidth = Dimensions.get('screen').width;
const BookInfoItem: FC<
  { bookInfo: BookInfo } & Pick<Props, 'onNavigateBookDetail'>
> = memo(({ bookInfo, onNavigateBookDetail }) => {
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

  const onPress = useCallback(() => {
    onNavigateBookDetail(bookInfo);
  }, [onNavigateBookDetail, bookInfo]);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <AnimatedImage
        source={getImg(bookInfo.thumbnail)}
        width={`${screenWidth / 5}px`}
        height={`${(screenWidth / 5) * 1.5}px`}
        resizeMode="contain"
        mt={2}
        ml={`${screenWidth / 25}px`} // 1/5分スペースが余ったさらに5等分
        style={{ transform: [{ scale: scale }] }}
        alt={bookInfo.uid}
      />
    </Pressable>
  );
});
const AnimatedImage = Animated.createAnimatedComponent(Image);
