import React, { useContext, createContext, useState } from 'react';
import { User } from '@src/entities/user';
import { auth } from '@src/constants/firebase';

const AuthContext = createContext<{
  authorized: boolean;
  user: User | undefined;
}>({
  authorized: false,
  user: undefined,
});

export const useAuthContext = () => useContext(AuthContext);

const { Provider } = AuthContext;

export const AuthProvider: React.FC = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  auth.onAuthStateChanged(authUser => {
    setAuthorized(!!authUser);
  });

  return (
    <Provider value={{ authorized, user: undefined }}>{children}</Provider>
  );
};
