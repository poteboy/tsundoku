import React, { FC } from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';
import { colors } from '@src/styles';

export const MenuIcon: FC<{ focused: boolean; size: number }> = ({
  focused,
  size,
}) => {
  const Icon = createIcon({
    viewBox: '0 0 16 16',
    path: [
      <Path
        d="M2.75 4.25H13.25M2.75 12.25H13.25H2.75ZM2.75 8.25H13.25H2.75Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={focused ? 'black' : colors.gray}
      />,
    ],
  });
  return <Icon size={'md'} />;
};
