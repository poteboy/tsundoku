import { Model } from '@src/entities';
import { DocumentReference } from '@src/constants';

export interface Book extends Model {
  bookInfoRef: DocumentReference;
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
