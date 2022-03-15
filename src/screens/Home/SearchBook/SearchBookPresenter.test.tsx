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
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<SearchBookPresenter {...defaultProps} />);
    expect(toJSON).toBeDefined();
  });
});
