import React, { FC, memo } from 'react';
import { View, VStack, Text } from 'native-base';
import { BarCodeScanner, BarCodeEvent } from 'expo-barcode-scanner';

export type Props = {
  permitted: boolean;
  onHandleQR: ({ type, data }: BarCodeEvent) => void;
  scanned: boolean;
};

export const QRcodePresenter: FC<Props> = memo(
  ({ permitted, scanned, onHandleQR }) => {
    if (!permitted) return <NoAccess />;

    return (
      <View flex={1}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : onHandleQR}
          style={{ flex: 1 }}
        />
      </View>
    );
  },
);

const NoAccess = () => {
  return (
    <VStack flex={1} justifyContent="center">
      <Text>設定からカメラへのアクセスを許可してください</Text>
    </VStack>
  );
};
