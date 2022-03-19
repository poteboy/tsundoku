import { ImageSourcePropType } from 'react-native';

export const getImg = (uri?: string): ImageSourcePropType =>
  uri ? { uri: uri } : require('@assets/no-image.png');

export const compare = (arrA: any[], arrB: any[]) => {
  if (!arrA || !arrB) return false;
  if (arrA.length !== arrB.length) return false;

  for (let i = 0, l = arrA.length; i < l; i++) {
    if (arrA[i] instanceof Array && arrB[i] instanceof Array) {
      // オブジェクトの中身が配列の場合再起的に比較
      if (!compare(arrA[i], arrB[i])) return false;
    }
  }
  return true;
};

// export const
