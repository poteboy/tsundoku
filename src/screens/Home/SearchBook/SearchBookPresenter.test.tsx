import React from 'react';
import { render } from '@src/util';
import { SearchBookPresenter, Props } from './SearchBookPresenter';
import { mockBookInfo } from '@src/entities';

describe(`SearchBookPresenter`, () => {
  const defaultProps: Props = {
    onBack: jest.fn(() => {}),
    onDismiss: jest.fn(() => {}),
    onFocus: jest.fn(() => {}),
    focused: false,
    cameraIcon: () => <></>,
    bookInfos: [mockBookInfo],
    onNavigateBookInfo: jest.fn(() => {}),
    loading: false,
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<SearchBookPresenter {...defaultProps} />);
    expect(toJSON).toBeDefined();
  });
});
