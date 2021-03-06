import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Header, Spacer } from '@src/components';
import {
  View,
  Image,
  VStack,
  Input,
  Icon,
  Box,
  Pressable,
  Divider,
  HStack,
  Text,
  ScrollView,
  Spinner,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@src/styles';
import { TouchableWithoutFeedback } from 'react-native';
import { BookInfo } from '@src/entities';
import { getImg } from '@src/util';

export type Props = {
  onBack: () => void;
  focused: boolean;
  onFocus: () => void;
  onDismiss: (key?: string) => void;
  cameraIcon: () => JSX.Element;
  bookInfos: BookInfo[] | undefined;
  onNavigateBookInfo: (bookInfo: BookInfo) => void;
  loading: boolean;
};

export const SearchBookPresenter: FC<Props> = memo(
  ({
    onBack,
    onFocus,
    onDismiss,
    focused,
    cameraIcon,
    onNavigateBookInfo,
    loading,
    bookInfos,
  }) => {
    const [key, setKey] = useState<string>();
    const submit = useCallback(() => {
      onDismiss(key);
    }, [key, onDismiss]);

    return (
      <>
        <Header title="本を探す" onBack={onBack} RightIcon={cameraIcon} />
        <View flex={1}>
          <VStack w="100%" space={5}>
            <Box bg={colors.lightGray}>
              <Input
                alignSelf="center"
                placeholder="検索（タイトル）"
                bg={colors.medGray}
                borderRadius="4"
                py="1"
                px="1"
                my={2}
                mx={4}
                variant="unstyled"
                fontSize="16"
                autoFocus
                onFocus={onFocus}
                onChangeText={text => {
                  setKey(text);
                }}
                onSubmitEditing={submit}
                onEndEditing={submit}
                InputLeftElement={
                  <Icon
                    m="2"
                    ml="3"
                    size="6"
                    color="gray.400"
                    as={<MaterialIcons name="search" />}
                  />
                }
              />
            </Box>
          </VStack>
          <TouchableWithoutFeedback onPress={submit} accessible={false}>
            <VStack
              flex={1}
              height="100%"
              bg={!focused ? colors.White : 'rgba(0, 0, 0, 0.1)'}
            >
              <ScrollView>
                {loading && (
                  <Box alignItems="center" justifyContent="center" flex={1}>
                    <Spinner mt={40} />
                  </Box>
                )}
                {bookInfos &&
                  bookInfos.map((bookInformation, index) => {
                    return (
                      <View key={bookInformation.uid}>
                        <BookCard
                          {...{ bookInformation, onNavigateBookInfo }}
                          key={index}
                        />
                        <Divider />
                      </View>
                    );
                  })}
              </ScrollView>
            </VStack>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  },
);

export const BookCard: FC<
  { bookInformation: BookInfo } & Pick<Props, 'onNavigateBookInfo'>
> = memo(({ bookInformation, onNavigateBookInfo }) => {
  const [bg, setBg] = useState(colors.White);
  const onPressIn = useCallback(() => {
    setBg(colors.lightGray);
  }, []);
  const onPressOut = useCallback(() => {
    setBg(colors.White);
  }, []);
  const navigate = useCallback(() => {
    onNavigateBookInfo(bookInformation);
  }, []);

  return (
    <Pressable onPress={navigate} onPressIn={onPressIn} onPressOut={onPressOut}>
      <HStack bg={bg} py={4} width="100%">
        <Image
          source={getImg(bookInformation.imgUrl)}
          width="60px"
          height="100px"
          resizeMode="contain"
          mx={4}
          alt={bookInformation.title}
        />
        <VStack mx={4} width="70%">
          <Text fontWeight={500} numberOfLines={1}>
            {bookInformation.title}
          </Text>
          <Spacer size={4} />
          <Text color={'gray.600'}>{bookInformation.authors[0]}</Text>
          <Spacer size={2} />
          <Text color={'gray.600'}>{bookInformation.publisher}</Text>
        </VStack>
      </HStack>
    </Pressable>
  );
});
