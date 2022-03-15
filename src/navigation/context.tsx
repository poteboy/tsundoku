import React, { createContext, useContext } from 'react';
import { Book } from '@src/entities';

// TODO user/bookにBookのrefを入れる
export const TabContext = createContext<{ books: Book[] }>({
  books: [],
});

export const useTabContext = () => useContext(TabContext);
