import { isBooksEqual, mockBook, Book } from './book';

describe(`isBooksEqual`, () => {
  it(`returns true when two args are same`, () => {
    const bookA: Book = mockBook;
    const bookB: Book = mockBook;
    expect(isBooksEqual([bookA], [bookB])).toBe(true);
  });

  it(`returns true when memo || opinion are not same`, () => {
    const bookA: Book = mockBook;
    const bookB: Book = { ...mockBook, memo: 'test' };
    expect(isBooksEqual([bookA], [bookB])).toBe(true);
  });

  it(`returns false when uid are not same`, () => {
    const bookA: Book = mockBook;
    const bookB: Book = { ...mockBook, uid: 'bookB' };
    expect(isBooksEqual([bookA], [bookB])).toBe(false);
  });
});
