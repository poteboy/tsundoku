import { Header, Spacer } from '@src/components';
import React, { FC, memo } from 'react';
import { Book } from '@src/entities';
import { VStack, Image, Text, Divider, View, Button } from 'native-base';
import { colors } from '@src/styles';
import { ScrollView } from 'react-native';

type Props = {
  book: Book;
  onBack: () => void;
};

export const BookInfoPresenter: FC<Props> = memo(({ onBack, book }) => {
  return (
    <View flex={1} bg={colors.White}>
      <Header title="本の情報" onBack={onBack} />
      <ScrollView>
        <VStack flex={1} bg={colors.White} alignItems="center" width="100%">
          <Spacer size={16} />
          <Image
            source={{ uri: book.thumbnail }}
            width="140px"
            height="220px"
            resizeMode="contain"
            shadow={4}
          />
          <Spacer size={16} />
          <Text fontWeight={600} fontSize="lg">
            {book.title}
          </Text>
          <Spacer size={8} />
          <Text color={colors.Info400} mx="auto" fontSize="md">
            {book.authors[0]}
          </Text>
          <Spacer size={8} />
          <Text mx="auto" fontSize="md" color="gray.700">
            {book.publishedDate}
          </Text>
          <Spacer size={8} />
          <Button px={16} py={2} _text={{ fontSize: 'lg' }}>
            本棚に登録する
          </Button>
          <Spacer size={16} />
          <View width="80%">
            <Divider />
          </View>
          <Spacer size={16} />
          <Text mr="auto" ml={8} fontWeight={600} fontSize="lg">
            本書の説明
          </Text>
          <Spacer size={8} />
          {book.description ? (
            <Text textAlign="left" mx={16} alignSelf="flex-start">
              {book.description}
            </Text>
          ) : (
            <Text
              textAlign="left"
              ml={16}
              alignSelf="flex-start"
              color="gray.500"
            >
              この本に説明はありません
            </Text>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
});
