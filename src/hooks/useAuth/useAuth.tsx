import { useState, useEffect, useLayoutEffect } from 'react';
import { useContainer, createContainer } from 'unstated-next';
import { auth } from '@src/constants/firebase';

const container = () => {
  const [authorized, setAuthorized] = useState(false);

  auth.onAuthStateChanged(authUser => {
    setAuthorized(!!authUser);
  });

  return {
    authorized,
  };
};

export const AuthContainer = createContainer(container);

export const useAuth = () => useContainer(AuthContainer);
