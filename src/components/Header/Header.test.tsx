import React from 'react';
import { Header, Props } from './Header';
import { render } from '@src/util';

describe(`Header`, () => {
  const defaultProps: Props = {
    title: 'テスト',
    onBack: () => {},
    onClose: () => {},
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<Header {...defaultProps} />);
    expect(toJSON).toBeDefined();
  });

  it(`renders title correctly`, () => {
    const { queryByText } = render(<Header {...defaultProps} />);
    expect(queryByText(defaultProps.title)).toBeTruthy();
  });

  it(`does not have back button when onBack prop does not exists`, () => {
    const props: Props = { ...defaultProps, onBack: undefined };
    const { queryByTestId } = render(<Header {...props} />);
    expect(queryByTestId('back')).toBeNull();
  });

  it(`does not have close button when onClose prop does not exists`, () => {
    const props: Props = { ...defaultProps, onClose: undefined };
    const { queryByTestId } = render(<Header {...props} />);
    expect(queryByTestId('close')).toBeNull();
  });
});
