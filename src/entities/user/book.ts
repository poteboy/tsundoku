import { Model, Active } from '@src/entities';
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

export const mockBook: Book = {
  uid: 'test-book',
  createdAt: new Date(),
  active: Active.Activated,
  bookInfoRef: null as any,
};
