import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Header } from '@src/components';
import { View, Button, VStack, Input, Icon, Box, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@src/styles';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export type Props = {
  onBack: () => void;
  focused: boolean;
  onFocus: () => void;
  onDismiss: () => void;
  cameraIcon: () => JSX.Element;
};

export const SearchBookPresenter: FC<Props> = memo(
  ({ onBack, onFocus, onDismiss, focused, cameraIcon }) => {
    return (
      <>
        <Header title="本を探す" onBack={onBack} RightIcon={cameraIcon} />
        <View flex={1}>
          <VStack w="100%" space={5}>
            <Box>
              <Input
                alignSelf="center"
                placeholder="検索（タイトル）"
                bg="gray.200"
                borderRadius="4"
                py="1"
                px="1"
                my={2}
                mx={4}
                variant="unstyled"
                fontSize="16"
                onFocus={onFocus}
                onSubmitEditing={onDismiss}
                InputLeftElement={
                  <Icon
                    m="2"
                    ml="3"
                    size="6"
                    color="gray.400"
                    as={<MaterialIcons name="search" />}
                  />
                }
              />
            </Box>
          </VStack>
          <TouchableWithoutFeedback onPress={onDismiss} accessible={false}>
            <VStack
              flex={1}
              bg={!focused ? colors.White : 'rgba(0, 0, 0, 0.1)'}
            >
              <></>
            </VStack>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  },
);
