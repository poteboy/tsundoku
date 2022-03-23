import React, { FC, memo } from 'react';
import { VStack, ScrollView, Divider, View } from 'native-base';
import { BookSet, Category } from '@src/entities';
import { Header } from '@src/components';
import { colors } from '@src/styles';
import { BookCard } from '@src/screens/Home/SearchBook/SearchBookPresenter';

type Props = {
  bookSets: BookSet[];
  category: Category;
  onBack: () => void;
  onNavigateBookInfo: () => void;
};

export const BookListPresenter: FC<Props> = memo(
  ({ category, onBack, bookSets, onNavigateBookInfo }) => {
    return (
      <VStack flex={1} bg={colors.lightGray}>
        <Header title={category.name} onBack={onBack} reverse />
        <ScrollView>
          {bookSets.map(set => {
            return (
              <View key={set.book.uid}>
                <BookCard
                  bookInformation={set.bookInfo}
                  onNavigateBookInfo={onNavigateBookInfo}
                />
                <Divider />
              </View>
            );
          })}
        </ScrollView>
      </VStack>
    );
  },
);
