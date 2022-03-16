import React, { createContext, useContext } from 'react';
import { BookInfo } from '@src/entities';

// TODO user/bookにBookのrefを入れる
export const TabContext = createContext<{ bookInfos: BookInfo[] }>({
  bookInfos: [],
});

export const useTabContext = () => useContext(TabContext);
