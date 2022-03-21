import React from 'react';
import { render } from '@src/util';
import { SearchBookPresenter, Props } from './SearchBookPresenter';
import { mockBookInfo } from '@src/entities';

describe(`SearchBookPresenter`, () => {
  const defaultProps: Props = {
    onBack: () => {},
    onDismiss: () => {},
    onFocus: () => {},
    focused: false,
    cameraIcon: () => <></>,
    bookInfos: [mockBookInfo],
    onNavigateBookInfo: () => {},
    loading: false,
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<SearchBookPresenter {...defaultProps} />);
    expect(toJSON).toBeDefined();
  });
});
