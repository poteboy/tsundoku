import { QRcodePresenter, Props } from './QRcodePresenter';
import { render } from '@src/util';
import React from 'react';

describe(`QRcodePresenter`, () => {
  const defaultProps: Props = {
    permitted: true,
    onHandleQR: ({ type, data }) => {},
    scanned: false,
  };

  it(`renders correctly`, () => {
    const component = render(<QRcodePresenter {...defaultProps} />);
    expect(component).toBeDefined();
  });
});
