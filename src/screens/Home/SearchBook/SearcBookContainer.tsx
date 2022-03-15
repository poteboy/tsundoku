import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  useHomeNavigation,
  HomeKeys,
} from '@src/navigation/HomeNavigator/route';
import { SearchBookPresenter } from './SearchBookPresenter';
import { Keyboard, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@src/styles';

export const SearchBookContainer: FC = () => {
  const navigation = useHomeNavigation();

  const [focused, setFocused] = useState(false);
  const focus = useCallback(() => {
    setFocused(true);
  }, [setFocused]);
  const dismiss = useCallback(() => {
    Keyboard.dismiss();
    setFocused(false);
  }, [setFocused]);

  const back = useCallback(() => {
    navigation.goBack();
  }, []);

  const cameraIcon = useCallback(() => {
    const navigateQR = () => {
      navigation.navigate(HomeKeys.QRcode);
    };
    return (
      <TouchableOpacity onPress={navigateQR}>
        <MaterialIcons name="camera-alt" size={24} color={colors.Info500} />
      </TouchableOpacity>
    );
  }, [navigation]);

  return (
    <SearchBookPresenter
      onBack={back}
      onDismiss={dismiss}
      onFocus={focus}
      focused={focused}
      cameraIcon={cameraIcon}
    />
  );
};
