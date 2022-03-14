import React, { createContext, useContext, FC } from 'react';

type Test = {
  test: any;
};

const context = createContext<Test>({
  test: null,
});

export const useTest = () => useContext(context);

const { Provider } = context;

export const TestProvider: FC = ({ children }) => {
  return <Provider value={{ test: null }}>{children}</Provider>;
};
