import React, { FC, memo, useState } from 'react';
import {
  VStack,
  ScrollView,
  Text,
  View,
  Actionsheet,
  Icon,
  Button,
} from 'native-base';
import { BookSet, Category } from '@src/entities';
import { Header, Spacer, CategoryModal } from '@src/components';
import { colors } from '@src/styles';
import { BookCard } from '@src/screens/Home/SearchBook/SearchBookPresenter';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  category: Category;
  onBack: () => void;
  RightIcon: () => JSX.Element;
  onCloseSheet: () => void;
  isOpenSheet: boolean;
  onDeleteCategory: () => void;
  onNavigateCategorize: () => void;
  bookSet: BookSet[];
};

export const BookListPresenter: FC<Props> = memo(
  ({
    category,
    onBack,
    RightIcon,
    onCloseSheet,
    isOpenSheet,
    onDeleteCategory,
    onNavigateCategorize,
    bookSet,
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <VStack flex={1} bg={colors.lightGray}>
        <Header
          title={category.name}
          onBack={onBack}
          reverse
          RightIcon={RightIcon}
        />
        <ScrollView>
          <VStack>
            <Spacer size={16} />
            <Button
              variant="outline"
              mx={16}
              py={2}
              onPress={onNavigateCategorize}
              _text={{
                fontSize: 'lg',
                py: 1,
              }}
            >
              本を追加
            </Button>
            {bookSet.map(set => {
              return <Text>{set.bookInfo.title}</Text>;
            })}
          </VStack>
        </ScrollView>
        <CategorySheet
          onClose={onCloseSheet}
          isOpen={isOpenSheet}
          onDeleteCategory={onDeleteCategory}
        />
        <CategoryModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={console.log}
        />
      </VStack>
    );
  },
);

type SheetProps = {
  onClose: () => void;
  isOpen: boolean;
  onDeleteCategory: () => void;
};

const CategorySheet: FC<SheetProps> = memo(
  ({ onClose, isOpen, onDeleteCategory }) => {
    return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={<MaterialIcons name="edit" />}
                color="muted.500"
                mr={3}
              />
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
            onPress={onDeleteCategory}
          >
            削除
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    );
  },
);
