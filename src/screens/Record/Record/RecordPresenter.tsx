import React, { FC, memo, useEffect } from 'react';
import { View, VStack } from 'native-base';
import { Header } from '@src/components';
import { useAdMob } from '@src/hooks';
import { colors } from '@src/styles';
import amazonPaapi from 'amazon-paapi';

type Props = {};

export const RecordPresenter: FC<Props> = memo(() => {
  // 一定以上の売り上げがないと使えないらしい
  const params = {
    AccessKey: 'hoge',
    SecretKey: 'hoge',
  };

  const request = {
    Keywords: 'Harry Potter',
    SearchIndex: 'Books' as const,
    ItemCount: 2,
    Resources: [
      'Images.Primary.Medium',
      'ItemInfo.Title',
      'Offers.Listings.Price',
    ],
  };

  const getData = async () => {
    const data = await amazonPaapi.SearchItems(params, request);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <VStack bg={colors.lightGray} flex={1}>
        <Header title="読書記録" />
      </VStack>
    </>
  );
});
