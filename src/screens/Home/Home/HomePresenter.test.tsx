import { render } from '@src/util';
import { HomePresenter, Props } from './HomePresenter';
import React from 'react';

describe(`HomePresenter`, () => {
  const defaultProps: Props = {
    onNavigateSearchBook: jest.fn(() => {}),
    bookInfos: [],
    onNavigateBookDetail: jest.fn(bf => {}),
    onFetchBookInfo: jest.fn(() => {}),
    fetching: false,
    AdBanner: () => <></>,
    premium: false,
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<HomePresenter {...defaultProps} />);
    expect(toJSON).toBeDefined();
  });
});
