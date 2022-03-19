import React, { FC } from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';
import { colors } from '@src/styles';

export const RecordIcon: FC<{ focused: boolean; size: number }> = ({
  focused,
  size,
}) => {
  const Icon = createIcon({
    viewBox: '0 0 17 17',
    path: [
      <Path
        d="M7.51286 11.1927H4.80456C4.64429 11.1927 4.5145 11.3469 4.5145 11.5374V16.5334C4.5145 16.7238 4.64429 16.878 4.80456 16.878H7.51286C7.67313 16.878 7.80272 16.7238 7.80272 16.5334V11.5371C7.80272 11.3467 7.67294 11.1927 7.51286 11.1927ZM11.7357 0.877991H9.02737C8.8671 0.877991 8.73732 1.03219 8.73732 1.22261V16.5331C8.73732 16.7236 8.8671 16.8778 9.02737 16.8778H11.7357C11.8959 16.8778 12.0257 16.7236 12.0257 16.5331V1.22261C12.0257 1.03219 11.8959 0.877991 11.7357 0.877991V0.877991ZM15.9802 5.52937H13.2719C13.1116 5.52937 12.9818 5.68357 12.9818 5.87399V16.5331C12.9818 16.7236 13.1116 16.8778 13.2719 16.8778H15.98C16.1402 16.8778 16.27 16.7236 16.27 16.5331V5.87399C16.27 5.6838 16.1402 5.52937 15.9802 5.52937V5.52937ZM3.26838 5.52937H0.560078C0.399808 5.52937 0.27002 5.68357 0.27002 5.87399V16.5331C0.27002 16.7236 0.399808 16.8778 0.560078 16.8778H3.26838C3.42865 16.8778 3.55844 16.7236 3.55844 16.5331V5.87399C3.55844 5.6838 3.42865 5.52937 3.26838 5.52937V5.52937Z"
        fill={focused ? 'black' : colors.gray}
      />,
    ],
  });
  return <Icon size={'sm'} />;
};