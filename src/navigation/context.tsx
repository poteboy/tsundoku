import React, { createContext, useContext } from 'react';
import { User } from '@src/entities';

// TODO user/bookにBookのrefを入れる
export const TabContext = createContext<{ user: User }>({
  user: null as any,
});

export const useTabContext = () => useContext(TabContext);
