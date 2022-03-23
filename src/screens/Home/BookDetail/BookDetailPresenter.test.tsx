import { render } from '@src/util';
import { BookDetailPresenter, Props } from './BookDetailPresenter';
import React from 'react';
import { mockBook, mockBookInfo } from '@src/entities';
import { fireEvent } from '@testing-library/react-native';
import { TrashRightIcon } from '@src/icons';

describe(`BookDetailPresenter`, () => {
  const deleteBook = jest.fn(() => {});
  const loading = false;

  const defaultProps: Props = {
    onBack: jest.fn(() => {}),
    bookInfo: mockBookInfo,
    book: mockBook,
    onDeleteBook: deleteBook,
    loadingDeletion: loading,
    AdBanner: () => <></>,
    TrashIcon: () => (
      <TrashRightIcon loading={loading} onPress={deleteBook} testID="delete" />
    ),
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<BookDetailPresenter {...defaultProps} />);
    expect(toJSON()).toBeDefined();
  });

  it(`calls onDeleteBook when delete button is called`, () => {
    const props: Props = { ...defaultProps };
    const { getByTestId } = render(<BookDetailPresenter {...props} />);
    fireEvent.press(getByTestId('delete'));
    expect(deleteBook).toBeCalled();
  });
});
