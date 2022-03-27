import { render } from '@src/util';
import { HomePresenter, Props } from './HomePresenter';
import React from 'react';

describe(`HomePresenter`, () => {
  const defaultProps: Props = {
    onNavigateSearchBook: jest.fn(() => {}),
    books: [],
    onNavigateBookDetail: jest.fn(bf => {}),
    fetching: false,
    AdBanner: () => <></>,
    premium: false,
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<HomePresenter {...defaultProps} />);
    expect(toJSON).toBeDefined();
  });
});
