import React, { FC, memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HStack, VStack, Text, Divider } from 'native-base';
import { colors } from '@src/styles/colors';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export type Props = {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
};

export const Header: FC<Props> = memo(({ title, onBack, onClose }) => {
  return (
    <VStack safeAreaTop bg={colors.White}>
      <HStack
        bg={colors.White}
        height="45px"
        overflow="hidden"
        px={4}
        alignItems="center"
      >
        {onBack && (
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={colors.Info500}
            style={{ position: 'absolute', left: '5%' }}
            onPress={onBack}
            testID="back"
          />
        )}
        {onClose && (
          <Ionicons
            name="ios-close"
            size={28}
            color={colors.Info500}
            style={{ position: 'absolute', left: '5%' }}
            onPress={onClose}
            testID="close"
          />
        )}
        <Text mx="auto" fontWeight={500} fontSize={16}>
          {title}
        </Text>
      </HStack>
      <Divider />
    </VStack>
  );
});
