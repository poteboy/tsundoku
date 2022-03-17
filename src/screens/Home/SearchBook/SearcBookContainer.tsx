import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';
import { SearchBookPresenter } from './SearchBookPresenter';
import {
  Keyboard,
  TouchableOpacity,
  unstable_batchedUpdates,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@src/styles';
import {
  isBookResponse,
  BookInfo,
  convertRespToBook,
  BookResponse,
} from '@src/entities/bookInfo';

export const SearchBookContainer: FC = () => {
  const navigation = useHomeNavigation();
  const [keyword, setKeyword] = useState<string>();
  const [bookInfos, setBookInfos] = useState<BookInfo[]>();
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
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
    unstable_batchedUpdates(() => {
      setBookInfos(undefined);
      setLoading(true);
    });
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${keyword}`,
    );
    const json = await res.json();
    const items: BookInfo[] = json.items
      .filter(isBookResponse)
      .map((item: BookResponse) => convertRespToBook(item));
    if (items.length > 0) {
      unstable_batchedUpdates(() => {
        setBookInfos(items);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const cameraIcon = useCallback(() => {
    const navigateQR = () => {
      navigation.navigate(HomeKeys.QRcode);
    };
    return (
      <TouchableOpacity onPress={navigateQR}>
        <MaterialIcons name="camera-alt" size={28} color={colors.Info500} />
      </TouchableOpacity>
    );
  }, [navigation]);

  const navigateBookInfo = useCallback(
    (bookInfo: BookInfo) => {
      navigation.navigate(HomeKeys.BookInfo, { bookInfo });
    },
    [navigation],
  );

  return (
    <SearchBookPresenter
      onBack={back}
      onDismiss={dismiss}
      onFocus={focus}
      focused={focused}
      cameraIcon={cameraIcon}
      bookInfos={bookInfos}
      onNavigateBookInfo={navigateBookInfo}
      loading={loading}
    />
  );
};