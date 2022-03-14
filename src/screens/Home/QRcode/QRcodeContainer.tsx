import { BarCodeScanner, BarCodeEvent } from 'expo-barcode-scanner';
import React, { FC, useEffect, useState, useCallback } from 'react';
import { QRcodePresenter } from './QRcodePresenter';

export const QRcodeContainer: FC = () => {
  const [permitted, setPermitted] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermitted(status === 'granted');
    })();
  }, []);

  const handleQR = useCallback(({ type, data }: BarCodeEvent) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }, []);

  return (
    <QRcodePresenter
      {...{ permitted }}
      onHandleQR={handleQR}
      scanned={scanned}
    />
  );
};
