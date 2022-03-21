import { render, shallow } from '@src/util';
import { BookInfoPresenter, Props } from './BookInfoPresenter';
import React from 'react';
import { mockBookInfo } from '@src/entities';

describe(`BookInfoPresenter`, () => {
  const defaultProps: Props = {
    bookInfo: mockBookInfo,
    onBack: jest.fn(() => {}),
    onRegisterBookInfo: jest.fn(() => {}),
    loadingCheck: false,
    isRegistered: false,
    AdBanner: () => <></>,
  };

  it(`should renders correctly`, () => {
    const { toJSON } = render(<BookInfoPresenter {...defaultProps} />);
    expect(toJSON).toBeDefined();
  });

  it(`should render book information`, () => {
    const { queryByText } = render(<BookInfoPresenter {...defaultProps} />);
    expect(queryByText(mockBookInfo.title)).toBeDefined();
    expect(queryByText(mockBookInfo.authors[0])).toBeDefined();
    expect(queryByText(mockBookInfo.publisher)).toBeDefined();
  });

  it(`should disable button when isRegistered is false`, () => {
    const { queryByText } = render(<BookInfoPresenter {...defaultProps} />);
    expect(queryByText('本棚に登録する')).toBeDefined();
    expect(queryByText('既に登録されています')).toBeNull();
  });

  it(`should enable button when isRegistered is true`, () => {
    const props: Props = { ...defaultProps, isRegistered: true };
    const { queryByText } = render(<BookInfoPresenter {...props} />);
    expect(queryByText('本棚に登録する')).toBeNull();
    expect(queryByText('既に登録されています')).toBeDefined();
  });
});
