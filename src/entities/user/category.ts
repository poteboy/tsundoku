import { Model, Book, BookInfo, mockBook, mockBookInfo } from '@src/entities';
import { DocumentReference } from '@src/constants';

export interface Category extends Model {
  name: string;
  bookSets: BookSet[];
}

export type BookSet = {
  book: Book;
  bookInfo: BookInfo;
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
