import React, { memo, FC, useCallback } from 'react';
import { VStack, Divider, Pressable, HStack, Text } from 'native-base';
import { Header, Spacer } from '@src/components';
import { colors } from '@src/styles';
import { ScrollView, Animated } from 'react-native';
import { MenuItem } from './SettingsHomeContainer';
import { MaterialIcons } from '@expo/vector-icons';

export type Props = {
  menuItems: MenuItem[];
};

export const SettingsHomePresenter: FC<Props> = memo(({ menuItems }) => {
  return (
    <>
      <Header title="メニュー" />
      <VStack flex={1} bg={colors.lightGray}>
        <ScrollView>
          <Spacer size={16} />
          <VStack mx={4}>
            {menuItems.map((item, index) => (
              <MenuItemCard
                key={index}
                item={item}
                first={index === 0}
                last={menuItems.length === index + 1}
              />
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </>
  );
});

const MenuItemCard: FC<{ item: MenuItem; first: boolean; last: boolean }> =
  memo(({ item, first, last }) => {
    const { title, onPress } = item;

    const scale = new Animated.Value(1);

    const onPressIn = useCallback(() => {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 40,
        useNativeDriver: true,
      }).start();
    }, [scale]);

    const onPressOut = useCallback(() => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 0,
        useNativeDriver: true,
        overshootClamping: true,
      }).start();
    }, [scale]);

    return (
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <AnimatedStack
          pt={2}
          bg={colors.White}
          width="100%"
          borderTopRadius={first ? 20 : 0}
          borderBottomRadius={last ? 20 : 0}
          style={{ transform: [{ scale: scale }] }}
          mb={0.5}
        >
          <HStack my={4} mx={2} alignItems="center" width="100%">
            <Text ml={5} fontSize="md" fontWeight={500}>
              {title}
            </Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={18}
              color={colors.medGray}
              style={{
                position: 'absolute',
                right: 20,
              }}
            />
          </HStack>
        </AnimatedStack>
      </Pressable>
    );
  });

const AnimatedStack = Animated.createAnimatedComponent(HStack);
