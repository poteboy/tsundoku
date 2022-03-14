import React, { FC } from 'react';
import { View } from 'native-base';

export const Spacer: FC<{ size: number; horizontal?: boolean }> = ({
  size,
  horizontal,
}) => {
  const px = size;

  return (
    <View
      testID="spacer"
      style={
        horizontal
          ? { width: px, height: 'auto', flexShrink: 0 }
          : { width: 'auto', height: px, flexShrink: 0 }
      }
    />
  );
};
