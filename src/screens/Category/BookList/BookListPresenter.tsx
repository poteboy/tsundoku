import React, { FC, memo } from 'react';
import {
  VStack,
  ScrollView,
  Divider,
  View,
  Actionsheet,
  Icon,
} from 'native-base';
import { BookSet, Category } from '@src/entities';
import { Header } from '@src/components';
import { colors } from '@src/styles';
import { BookCard } from '@src/screens/Home/SearchBook/SearchBookPresenter';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  bookSets: BookSet[];
  category: Category;
  onBack: () => void;
  RightIcon: () => JSX.Element;
  onCloseSheet: () => void;
  isOpenSheet: boolean;
};

export const BookListPresenter: FC<Props> = memo(
  ({ category, onBack, bookSets, RightIcon, onCloseSheet, isOpenSheet }) => {
    return (
      <VStack flex={1} bg={colors.lightGray}>
        <Header
          title={category.name}
          onBack={onBack}
          reverse
          RightIcon={RightIcon}
        />
        <ScrollView>
          {bookSets.map(set => {
            return (
              <View key={set.book.uid}>
                <BookCard
                  bookInformation={set.bookInfo}
                  onNavigateBookInfo={() => {}}
                />
                <Divider />
              </View>
            );
          })}
        </ScrollView>
        <CategorySheet onClose={onCloseSheet} isOpen={isOpenSheet} />
      </VStack>
    );
  },
);

type SheetProps = {
  onClose: () => void;
  isOpen: boolean;
};

const CategorySheet: FC<SheetProps> = memo(({ onClose, isOpen }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item
          startIcon={
            <Icon as={<MaterialIcons name="edit" />} color="muted.500" mr={3} />
          }
        >
          編集
        </Actionsheet.Item>
        <Actionsheet.Item
          startIcon={
            <Icon
              as={<MaterialIcons name="delete" />}
              color="muted.500"
              mr={3}
            />
          }
        >
          削除
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
});
