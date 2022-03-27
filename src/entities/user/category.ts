import { Model, Book, BookInfo, mockBook, mockBookInfo } from '@src/entities';
import { DocumentReference } from '@src/constants';
import { Model as _Model } from '@src/util';

export interface Category extends Model {
  name: string;
  // bookSetRefs: BookSetRef[];
  bookRefs: DocumentReference[];
}

export type BookSet = {
  book: Book;
  bookInfo: BookInfo;
};

export type BookSetRef = {
  bookRef: DocumentReference;
  bookInfoRef: DocumentReference;
};

export const isBookSet = (arg: unknown): arg is BookSet => {
  if (!arg) return false;
  const set = arg as BookSet;
  try {
    return !!set.book && !!set.bookInfo;
  } catch {
    return false;
  }
};

export const mockBookSet: BookSet = {
  book: mockBook,
  bookInfo: mockBookInfo,
};

export const isCategory = (arg: unknown): arg is Category => {
  if (!arg) return false;
  const category = arg as Category;
  try {
    return !!category.uid && !!category.name;
  } catch {
    return false;
  }
};

export const generateNewCategory = (name: string) => {
  const merge = new _Model().mergeModel;
  const category = merge<Category>({
    name,
    bookRefs: [],
  });
  return category;
};
