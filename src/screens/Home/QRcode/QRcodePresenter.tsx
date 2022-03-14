import React, { FC, memo } from 'react';
import { View, VStack, Text } from 'native-base';
import { BarCodeScanner, BarCodeEvent } from 'expo-barcode-scanner';
import { Header } from '@src/components';

export type Props = {
  permitted: boolean;
  onHandleQR: ({ type, data }: BarCodeEvent) => void;
  scanned: boolean;
  onClose: () => void;
};

export const QRcodePresenter: FC<Props> = memo(
  ({ permitted, scanned, onHandleQR, onClose }) => {
    if (!permitted) return <NoAccess onClose={onClose} />;

    return (
      <>
        <Header title="QRコード" onClose={onClose} />
        <View flex={1}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : onHandleQR}
            style={{ flex: 1 }}
            testID="scanner"
          />
        </View>
      </>
    );
  },
);

const NoAccess: FC<Pick<Props, 'onClose'>> = ({ onClose }) => {
  return (
    <>
      <Header title="QRコード" onClose={onClose} />
      <VStack flex={1} justifyContent="center">
        <Text>設定からカメラへのアクセスを許可してください</Text>
      </VStack>
    </>
  );
};
