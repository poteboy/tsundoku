import { render } from '@src/util';
import { BookDetailPresenter, Props } from './BookDetailPresenter';
import React from 'react';
import { mockBook, mockBookInfo } from '@src/entities';

describe(`BookDetailPresenter`, () => {
  const defaultProps: Props = {
    onBack: jest.fn(() => {}),
    bookInfo: mockBookInfo,
    book: mockBook,
    onDeleteBook: jest.fn(() => {}),
    loadingDeletion: false,
    AdBanner: () => <></>,
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<BookDetailPresenter {...defaultProps} />);
    expect(toJSON()).toBeDefined();
  });
});
