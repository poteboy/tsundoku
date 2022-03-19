import React, { FC, memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HStack, VStack, Text, Divider } from 'native-base';
import { colors } from '@src/styles/colors';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export type Props = {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
  RightIcon?: () => JSX.Element;
};

export const Header: FC<Props> = memo(
  ({ title, onBack, onClose, RightIcon }) => {
    return (
      <VStack safeAreaTop bg={colors.White}>
        <HStack
          bg={colors.White}
          height="50px"
          overflow="hidden"
          px={4}
          alignItems="center"
        >
          {onBack && (
            <MaterialIcons
              name="arrow-back-ios"
              size={28}
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
          <Text
            mx="auto"
            fontWeight={500}
            fontSize="lg"
            maxW="75%"
            numberOfLines={1}
          >
            {title}
          </Text>
          {!!RightIcon && <RightIcon />}
        </HStack>
        <Divider />
      </VStack>
    );
  },
);
