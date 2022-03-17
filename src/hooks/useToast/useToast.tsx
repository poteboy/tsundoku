import React, { useCallback, useRef } from 'react';
import { HStack, Text, useToast as useFeedback, Image } from 'native-base';
import { Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@src/styles';
import { SuccessCircle, ErrorCircle } from '@src/icons';

export type ToastItem = {
  message: string;
  status: 'error' | 'success' | 'info';
};

const screenWidth = Dimensions.get('screen').width;

export const useToast = () => {
  const toast = useFeedback();
  const currentRef = useRef();

  const close = useCallback(() => {
    toast.closeAll();
  }, [toast]);

  const showToast = useCallback(
    (item: ToastItem) => {
      const { message, status } = item;

      const icon =
        status === 'success' ? (
          <SuccessCircle style={{ width: '40px' }} />
        ) : status === 'error' ? (
          <ErrorCircle style={{ width: '40px' }} />
        ) : (
          <SuccessCircle style={{ width: '40px' }} />
        );

      if (!toast.isActive(message)) {
        toast.closeAll();
        currentRef.current = toast.show({
          duration: 1500,
          title: message,
          status: status ?? 'info',
          placement: 'top',
          render: () => (
            <HStack
              bg={colors.Black}
              p="12px 16px"
              borderRadius="8px"
              shadow={4}
              minWidth="240px"
            >
              {icon}
              <Text
                fontSize="14px"
                fontWeight={500}
                fontFamily="Hiragino Sans"
                flexWrap="wrap"
                color={colors.White}
                alignSelf="center"
                ml={4}
              >
                {message}
              </Text>
            </HStack>
          ),
        });
      }
    },
    [toast, currentRef],
  );

  return { showToast };
};
