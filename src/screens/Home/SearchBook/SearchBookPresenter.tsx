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
  Card,
  HStack,
  Text,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@src/styles';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Book } from '@src/entities';

export type Props = {
  onBack: () => void;
  focused: boolean;
  onFocus: () => void;
  onDismiss: (key?: string) => void;
  cameraIcon: () => JSX.Element;
  books: Book[] | undefined;
};

export const SearchBookPresenter: FC<Props> = memo(
  ({ onBack, onFocus, onDismiss, focused, cameraIcon, books }) => {
    const [key, setKey] = useState<string>();
    const submit = () => {
      console.log('submit', key);
      onDismiss(key);
    };

    return (
      <>
        <Header title="本を探す" onBack={onBack} RightIcon={cameraIcon} />
        <View flex={1}>
          <VStack w="100%" space={5}>
            <Box>
              <Input
                alignSelf="center"
                placeholder="検索（タイトル）"
                bg="gray.200"
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
              {books &&
                books.map((book, index) => {
                  return <BookCard book={book} key={index} />;
                })}
              <VStack height={'200px'} bg={'black'} />
            </VStack>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  },
);

const BookCard: FC<{ book: Book }> = memo(({ book }) => {
  console.log(book);
  return (
    <Pressable>
      <Card>
        <HStack>
          <Image
            source={{ uri: book.thumbnail }}
            width="70px"
            height="110px"
            resizeMode="contain"
          />
          <VStack>
            <Text>{book.title}</Text>
          </VStack>
        </HStack>
      </Card>
    </Pressable>
  );
});
