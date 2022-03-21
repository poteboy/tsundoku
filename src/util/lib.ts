import { ImageSourcePropType } from 'react-native';
import { format } from 'date-fns';

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

export const divideAuthor = (authors: string) => {
  return authors.split('/');

type TimeStamp = {
  nanoseconds: number;
  seconds: number;
};

export const convertDate = (arg: Date | TimeStamp): Date => {
  if (arg instanceof Date) return arg;
  return new Date(arg.seconds * 1000);
};

export const formatDate = (arg: Date) => {
  return format(arg, 'yyyy年MM月dd日');
};
