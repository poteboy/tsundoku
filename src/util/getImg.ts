import { ImageSourcePropType } from 'react-native';

export const getImg = (uri?: string): ImageSourcePropType =>
  uri ? { uri: uri } : require('@assets/no-image.png');
