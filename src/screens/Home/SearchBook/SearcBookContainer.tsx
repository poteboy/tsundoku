import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';
import { SearchBookPresenter } from './SearchBookPresenter';
import { Keyboard, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@src/styles';
import {
  isBookResponse,
  Book,
  convertRespToBook,
  BookResponse,
} from '@src/entities';

export const SearchBookContainer: FC = () => {
  const navigation = useHomeNavigation();
  const [keyword, setKeyword] = useState<string>();
  const [books, setBooks] = useState<Book[]>();
  const [focused, setFocused] = useState(false);
  const focus = useCallback(() => {
    setFocused(true);
  }, [setFocused]);
  const dismiss = useCallback(
    (key?: string) => {
      Keyboard.dismiss();
      setFocused(false);
      setKeyword(key);
    },
    [setFocused],
  );

  const back = useCallback(() => {
    navigation.goBack();
  }, []);

  useEffect(() => {
    if (keyword) searchBook(keyword);
  }, [keyword]);

  const searchBook = useCallback(async (keyword: string) => {
    console.log(keyword);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${keyword}`,
    );
    const json = await res.json();
    const items: Book[] = json.items.filter((item: BookResponse | unknown) => {
      if (isBookResponse(item)) return convertRespToBook(item);
    });
    if (items.length > 0) setBooks(items);
  }, []);

  const cameraIcon = useCallback(() => {
    const navigateQR = () => {
      navigation.navigate(HomeKeys.QRcode);
    };
    return (
      <TouchableOpacity onPress={navigateQR}>
        <MaterialIcons name="camera-alt" size={24} color={colors.Info500} />
      </TouchableOpacity>
    );
  }, [navigation]);

  return (
    <SearchBookPresenter
      onBack={back}
      onDismiss={dismiss}
      onFocus={focus}
      focused={focused}
      cameraIcon={cameraIcon}
      books={books}
    />
  );
};
