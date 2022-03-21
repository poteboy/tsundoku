import { Model, Active } from '@src/entities';
import { DocumentReference } from '@src/constants';
import { BookInfo } from '../bookInfo';

export interface Book extends Model {
  bookInfoRef: DocumentReference;
  opinion?: string;
  memo?: string;
}

export const isBook = (arg: unknown): arg is Book => {
  if (!arg) return false;
  const tmp = arg as Book;
  try {
    return !!tmp.uid && !!tmp.bookInfoRef;
  } catch {
    return false;
  }
};

export const mockBook: Book = {
  uid: 'test-book',
  createdAt: new Date(),
  active: Active.Activated,
  bookInfoRef: 'null' as any,
};

export const isBooksEqual = (a: Book[], b: Book[]) => {
  if (a.length !== b.length) return false;
  if (a.length == 0 && b.length == 0) return true;
  a.sort((y, z) => (y.createdAt < z.createdAt ? 1 : -1));
  b.sort((y, z) => (y.createdAt < z.createdAt ? 1 : -1));

  for (let i = 0, l = a.length; i < l; i++) {
    if (!isBookEqual(a[i], b[i])) return false;
  }
  return true;
};

// これはbook infoをfetchする時に使うのでopinionとmemoは比較しない
function isBookEqual(a: Book, b: Book) {
  return (
    a.uid === b.uid &&
    a.bookInfoRef.path === b.bookInfoRef.path &&
    a.active === b.active
  );
}

// これはSaveボタンを表示させる時に使うのでmemoとopinionのみ比較
export function isBookDetailEqual(a: Book, b: Book) {
  return a.memo === b.memo && a.opinion === b.opinion;
}
