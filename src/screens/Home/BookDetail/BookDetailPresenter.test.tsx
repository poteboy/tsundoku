import { render } from '@src/util';
import { BookDetailPresenter, Props } from './BookDetailPresenter';
import React from 'react';
import { mockBook, mockBookInfo } from '@src/entities';
import { fireEvent } from '@testing-library/react-native';

describe(`BookDetailPresenter`, () => {
  const defaultProps: Props = {
    onBack: jest.fn(() => {}),
    bookInfo: mockBookInfo,
    book: mockBook,
    onDeleteBook: jest.fn(() => {}),
    loadingDeletion: false,
    AdBanner: () => <></>,
    TrashIcon: () => <></>,
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<BookDetailPresenter {...defaultProps} />);
    expect(toJSON()).toBeDefined();
  });

  it(`disable delete button when loading`, () => {
    const props: Props = { ...defaultProps, loadingDeletion: true };
    const { queryByText } = render(<BookDetailPresenter {...props} />);
    expect(queryByText('削除中...')).toBeDefined();
    expect(queryByText('本棚から削除する')).toBeNull();
  });

  it(`calls onDeleteBook when delete button is called`, () => {
    const onDeleteBook = jest.fn(() => {});
    const props: Props = { ...defaultProps, onDeleteBook };
    const { getByTestId } = render(<BookDetailPresenter {...props} />);
    fireEvent.press(getByTestId('delete'));
    expect(onDeleteBook).toBeCalled();
  });
});
