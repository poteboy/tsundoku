import React, { FC, useState, memo } from 'react';
import { VStack, Button, HStack, Image, Text } from 'native-base';
import { Header, Spacer } from '@src/components';
import { Book } from '@src/entities';
import { BookInfo } from '@src/entities/bookInformation/bookInformation';
import { colors } from '@src/styles';
import { getImg, divideAuthor } from '@src/util';
import { ScrollView, Button as RNButton, Linking } from 'react-native';

export type Props = {
  onBack: () => void;
  bookInfo: BookInfo;
  book: Book;
  onDeleteBook: () => void;
  loadingDeletion: boolean;
};

export const BookDetailPresenter: FC<Props> = memo(
  ({ book, bookInfo, onBack, onDeleteBook, loadingDeletion }) => {
    return (
      <>
        <Header title={bookInfo.title} onBack={onBack} />
        <VStack flex={1} bg={colors.lightGray}>
          <ScrollView>
            <Spacer size={16} />
            <HStack mx={4}>
              <Image
                source={getImg(bookInfo.imgUrl)}
                resizeMode="contain"
                h="160px"
                w="120px"
              />
              <VStack ml={3} py={1} maxW="65%">
                <Text fontSize="xl" numberOfLines={1}>
                  {bookInfo.title}
                </Text>
                <Spacer size={4} />
                <Text fontSize="md" numberOfLines={1} color={colors.Info500}>
                  {divideAuthor(bookInfo.author)[0]}
                </Text>
                <Spacer size={4} />
                <Text fontSize="sm" color={colors.dartGray} numberOfLines={1}>
                  {bookInfo.publisher}
                </Text>
                <Spacer size={4} />
                <Text fontSize="sm" color={colors.dartGray} numberOfLines={1}>
                  {bookInfo.publishedAt}
                </Text>
              </VStack>
            </HStack>
            <Spacer size={16} />
            <RNButton
              onPress={() => {
                Linking.openURL(bookInfo.itemUrl);
              }}
              title="この本の詳細"
            />
            <Spacer size={16} />
            <Button
              onPress={onDeleteBook}
              variant="danger"
              disabled={loadingDeletion}
            >
              {loadingDeletion ? '削除中...' : '本棚から削除する'}
            </Button>
          </ScrollView>
        </VStack>
      </>
    );
  },
);
