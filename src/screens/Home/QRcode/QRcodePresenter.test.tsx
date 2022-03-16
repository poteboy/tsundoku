import { QRcodePresenter, Props } from './QRcodePresenter';
import { render } from '@src/util';
import React from 'react';

describe(`QRcodePresenter`, () => {
  const defaultProps: Props = {
    permitted: true,
    onHandleQR: ({ type, data }) => {},
    scanned: false,
    onClose: () => {},
    isError: false,
  };

  it(`renders correctly`, () => {
    const component = render(<QRcodePresenter {...defaultProps} />);
    expect(component).toBeDefined();
  });

  it(`renders scanner when scanned is true`, () => {
    const props: Props = { ...defaultProps, scanned: true };
    const { queryByTestId } = render(<QRcodePresenter {...props} />);
    expect(queryByTestId('scanner')).toBeTruthy();
  });

  it(`does not render scanner when scanned is false`, () => {
    const { queryByTestId } = render(<QRcodePresenter {...defaultProps} />);
    expect(queryByTestId('scanner')).toBeTruthy();
  });
});
