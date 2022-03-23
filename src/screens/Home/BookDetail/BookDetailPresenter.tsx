import React, { FC, useState, memo } from 'react';
import {
  VStack,
  Button,
  HStack,
  Image,
  Text,
  View,
  Divider,
  Pressable,
} from 'native-base';
import { Header, Spacer } from '@src/components';
import { Book, BookInfo } from '@src/entities';
import { colors } from '@src/styles';
import { getImg, divideAuthor, formatDate, convertDate } from '@src/util';
import { ScrollView, Button as RNButton, Linking } from 'react-native';

export type Props = {
  onBack: () => void;
  bookInfo: BookInfo;
  book: Book;
  onDeleteBook: () => void;
  loadingDeletion: boolean;
  AdBanner: React.FC<any>;
  TrashIcon: () => JSX.Element;
};

export const BookDetailPresenter: FC<Props> = memo(
  ({
    book,
    bookInfo,
    onBack,
    onDeleteBook,
    loadingDeletion,
    AdBanner,
    TrashIcon,
  }) => {
    return (
      <>
        <Header title={bookInfo.title} onBack={onBack} RightIcon={TrashIcon} />
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
                  {bookInfo.authors[0]}
                </Text>
                <Spacer size={4} />
                <Text fontSize="sm" color={colors.DimGray} numberOfLines={1}>
                  {bookInfo.publisher}
                </Text>
                <Spacer size={4} />
                <Text fontSize="sm" color={colors.DimGray} numberOfLines={1}>
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
            <HStack pl={2} py={1} bg={colors.Info400}>
              <Text color={colors.White} fontSize="md" fontWeight={400}>
                追加日
              </Text>
            </HStack>
            <Pressable>
              <View bg={colors.White} minH="50px" p={2}>
                <Text fontSize="md">
                  {formatDate(convertDate(book.createdAt))}
                </Text>
              </View>
              <Divider />
            </Pressable>
            <HStack pl={2} py={1} bg={colors.Info400}>
              <Text color={colors.White} fontSize="md" fontWeight={400}>
                メモ
              </Text>
            </HStack>
            <Pressable>
              <View bg={colors.White} minH="100px" p={2}>
                <Text color={colors.DimGray}>まだメモはありません</Text>
              </View>
              <Divider />
            </Pressable>
            <HStack pl={2} py={1} bg={colors.Info400}>
              <Text color={colors.White} fontSize="md" fontWeight={400}>
                感想
              </Text>
            </HStack>
            <View bg={colors.White} minH="100px" p={2}>
              <Text color={colors.DimGray}>まだ感想はありません</Text>
            </View>
            <Divider />

            <Spacer size={32} />
            {/* <Button
              onPress={onDeleteBook}
              variant="danger"
              disabled={loadingDeletion}
              testID="delete"
              p={4}
              mx={20}
              borderRadius={10}
            >
              {loadingDeletion ? '削除中...' : '本棚から削除する'}
            </Button> */}
            <Spacer size={100} />
          </ScrollView>
          <AdBanner style={{ position: 'absolute', bottom: 0 }} />
        </VStack>
      </>
    );
  },
);
