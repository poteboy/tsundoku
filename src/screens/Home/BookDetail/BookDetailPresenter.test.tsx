import { render } from '@src/util';
import { BookDetailPresenter, Props } from './BookDetailPresenter';
import React from 'react';
import { mockBook, mockBookInfo } from '@src/entities';

describe(`BookDetailPresenter`, () => {
  const defaultProps: Props = {
    onBack: () => {},
    bookInfo: mockBookInfo,
    book: mockBook,
    onDeleteBook: () => {},
    loadingDeletion: false,
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<BookDetailPresenter {...defaultProps} />);
    expect(toJSON()).toBeDefined();
  });
});
