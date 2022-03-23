import React from 'react';
import { createIcon, Pressable } from 'native-base';
import { Path, Circle } from 'react-native-svg';
import { colors } from '@src/styles';

export const TrashIcon = createIcon({
  viewBox: '0 0 22 24',
  path: [
    <Path
      d="M9 0C8.477 0 7.941 0.184 7.562 0.563C7.184 0.94 7 1.476 7 2V3H0V5H1.094L3 23.094L3.094 24H18.906L19 23.094L20.906 5H22V3H15V2C15 1.477 14.816 0.941 14.437 0.562C14.06 0.184 13.523 0 13 0H9ZM9 2H13V3H9V2ZM3.125 5H18.875L17.094 22H4.906L3.125 5ZM7 8V19H9V8H7ZM10 8V19H12V8H10ZM13 8V19H15V8H13Z"
      fill={colors.dartGray}
    />,
  ],
});

type TrashProps = {
  loading: boolean;
  onPress: () => void;
  testID?: string;
};

export const TrashRightIcon: React.FC<TrashProps> = React.memo(
  ({ loading, onPress, testID }) => {
    const Icon = createIcon({
      viewBox: '0 0 22 24',
      path: [
        <Path
          d="M9 0C8.477 0 7.941 0.184 7.562 0.563C7.184 0.94 7 1.476 7 2V3H0V5H1.094L3 23.094L3.094 24H18.906L19 23.094L20.906 5H22V3H15V2C15 1.477 14.816 0.941 14.437 0.562C14.06 0.184 13.523 0 13 0H9ZM9 2H13V3H9V2ZM3.125 5H18.875L17.094 22H4.906L3.125 5ZM7 8V19H9V8H7ZM10 8V19H12V8H10ZM13 8V19H15V8H13Z"
          fill={loading ? colors.dartGray : colors.Main}
        />,
      ],
    });
    return (
      <Pressable onPress={onPress} testID={testID}>
        <Icon size={6} />
      </Pressable>
    );
  },
);
