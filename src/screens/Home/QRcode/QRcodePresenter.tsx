import React, { FC, memo } from 'react';
import { View, VStack, Text } from 'native-base';
import { BarCodeScanner, BarCodeEvent } from 'expo-barcode-scanner';
import { Header, Spacer } from '@src/components';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '@src/styles';

export type Props = {
  permitted: boolean;
  onHandleQR: ({ type, data }: BarCodeEvent) => void;
  scanned: boolean;
  onClose: () => void;
  isError: boolean;
};

export const QRcodePresenter: FC<Props> = memo(
  ({ permitted, scanned, onHandleQR, onClose, isError }) => {
    if (!permitted) return <NoAccess onClose={onClose} />;

    return (
      <>
        <Header title="バーコードリーダー" onClose={onClose} />
        <View flex={1}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : onHandleQR}
            style={{ height: '65%' }}
            testID="scanner"
          />
          <VStack height="35%" alignItems="center">
            <Spacer size={72} />
            <Text>本のバーコードをスキャンして本の情報を取得します</Text>
            <Spacer size={16} />
            {isError && (
              <Text color={colors.error} fontWeight={500}>
                読み取りエラーが発生しました
              </Text>
            )}
          </VStack>
        </View>
        {scanned && (
          <Spinner
            visible={scanned}
            textContent={'Loading...'}
            textStyle={{ color: colors.White }}
          />
        )}
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
