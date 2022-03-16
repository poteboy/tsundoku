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
import {
  Keyboard,
  TouchableWithoutFeedback,
  ImageSourcePropType,
} from 'react-native';
import { Book } from '@src/entities';

export type Props = {
  onBack: () => void;
  focused: boolean;
  onFocus: () => void;
  onDismiss: (key?: string) => void;
  cameraIcon: () => JSX.Element;
  books: Book[] | undefined;
  onNavigateBookInfo: (book: Book) => void;
  loading: boolean;
};

export const SearchBookPresenter: FC<Props> = memo(
  ({
    onBack,
    onFocus,
    onDismiss,
    focused,
    cameraIcon,
    books,
    onNavigateBookInfo,
    loading,
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
                {books &&
                  books.map((book, index) => {
                    return (
                      <View key={book.uid}>
                        <BookCard
                          {...{ book, onNavigateBookInfo }}
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

const BookCard: FC<{ book: Book } & Pick<Props, 'onNavigateBookInfo'>> = memo(
  ({ book, onNavigateBookInfo }) => {
    const [bg, setBg] = useState(colors.White);
    const onPressIn = useCallback(() => {
      setBg('gray.300');
    }, []);
    const onPressOut = useCallback(() => {
      setBg(colors.White);
    }, []);
    const navigate = useCallback(() => {
      onNavigateBookInfo(book);
    }, []);

    const img: ImageSourcePropType = book.thumbnail
      ? { uri: book.thumbnail }
      : require('@assets/no-image.png');

    return (
      <Pressable
        onPress={navigate}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <HStack bg={bg} py={4}>
          <Image
            source={img}
            width="60px"
            height="100px"
            resizeMode="contain"
            mx={4}
          />
          <VStack>
            <Text>{book.title}</Text>
            <Text>{book.subtitle}</Text>
          </VStack>
        </HStack>
      </Pressable>
    );
  },
);
