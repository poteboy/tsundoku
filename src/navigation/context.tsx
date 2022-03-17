import React, { createContext, useContext } from 'react';
import { BookInfo } from '@src/entities/bookInfo';

// TODO user/bookにBookのrefを入れる
export const TabContext = createContext<{ bookInfos: BookInfo[] }>({
  bookInfos: [],
});

export const useTabContext = () => useContext(TabContext);
