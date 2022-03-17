import React from 'react';
import { render } from '@src/util';
import { SearchBookPresenter, Props } from './SearchBookPresenter';

describe(`SearchBookPresenter`, () => {
  const defaultProps: Props = {
    onBack: () => {},
    onDismiss: () => {},
    onFocus: () => {},
    focused: false,
    cameraIcon: () => <></>,
    bookInfos: undefined,
    onNavigateBookInfo: () => {},
    loading: false,
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<SearchBookPresenter {...defaultProps} />);
    expect(toJSON).toBeDefined();
  });
});