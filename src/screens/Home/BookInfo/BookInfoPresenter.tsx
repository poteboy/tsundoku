import { Header, Spacer } from '@src/components';
import React, { FC, memo } from 'react';
import { BookInfo } from '@src/entities/bookInformation/bookInformation';
import { VStack, Image, Text, Divider, View, Button } from 'native-base';
import { colors } from '@src/styles';
import { ScrollView, ImageSourcePropType } from 'react-native';
import { useAdMob } from '@src/hooks';

type Props = {
  bookInfo: BookInfo;
  onBack: () => void;
  onRegisterBookInfo: () => void;
  loadingCheck: boolean;
  isRegistered: boolean;
};

export const BookInfoPresenter: FC<Props> = memo(
  ({ onBack, bookInfo, onRegisterBookInfo, loadingCheck, isRegistered }) => {
    const img: ImageSourcePropType = bookInfo.imgUrl
      ? { uri: bookInfo.imgUrl }
      : require('@assets/no-image.png');
    const { AdBanner } = useAdMob();

    return (
      <View flex={1} bg={colors.White}>
        <Header title="本の情報" onBack={onBack} />
        <ScrollView>
          <VStack flex={1} bg={colors.White} alignItems="center" width="100%">
            <Spacer size={16} />
            <Image
              source={img}
              width="140px"
              height="220px"
              resizeMode="contain"
              shadow={4}
            />
            <Spacer size={16} />
            <Text fontWeight={600} fontSize="lg" maxWidth="80%">
              {bookInfo.title}
            </Text>
            <Spacer size={8} />
            <Text color={colors.Info400} mx="auto" fontSize="md">
              {bookInfo.author}
            </Text>
            <Spacer size={8} />
            <Text mx="auto" fontSize="md" color="gray.700">
              {bookInfo.publisher}
            </Text>
            <Spacer size={8} />
            <Button
              onPress={onRegisterBookInfo}
              px={16}
              py={2}
              _text={{ fontSize: 'lg' }}
              disabled={loadingCheck || isRegistered}
            >
              {isRegistered
                ? '既に登録されています'
                : loadingCheck
                ? '登録中です'
                : '本棚に登録する'}
            </Button>
            <Spacer size={16} />
            <View width="80%">
              <Divider />
            </View>
            <Spacer size={16} />
            <Text mr="auto" ml={8} fontWeight={600} fontSize="lg">
              本書の説明
            </Text>
            <Spacer size={8} />
            {bookInfo.caption ? (
              <Text textAlign="left" mx={16} alignSelf="flex-start">
                {bookInfo.caption}
              </Text>
            ) : (
              <Text
                textAlign="left"
                ml={16}
                alignSelf="flex-start"
                color="gray.500"
              >
                この本に説明はありません
              </Text>
            )}
            <Spacer size={24} />
          </VStack>
        </ScrollView>
        <AdBanner />
      </View>
    );
  },
);
