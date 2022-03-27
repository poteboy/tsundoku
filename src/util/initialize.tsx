import React, { ReactNode } from 'react';
import { Container as UnstatedNextContainer } from 'unstated-next';
import { AuthContainer, BookInfoContainer } from '@src/hooks';

const allContainers = [AuthContainer, BookInfoContainer];

const combine = (
  containers: Array<UnstatedNextContainer<any, any>>,
  children: JSX.Element,
): JSX.Element => {
  return containers.reduce((acc, Container) => {
    return <Container.Provider>{acc}</Container.Provider>;
  }, children);
};

export const Container = (props: any): JSX.Element => {
  return combine([AuthContainer], props.children);
};
