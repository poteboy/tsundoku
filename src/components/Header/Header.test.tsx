import React from 'react';
import { Header, Props } from './Header';
import { render, shallow } from '@src/util';
import { fireEvent } from '@testing-library/react-native';

describe(`Header`, () => {
  const defaultProps: Props = {
    title: 'テスト',
    onBack: jest.fn(() => {}),
    onClose: jest.fn(() => {}),
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<Header {...defaultProps} />);
    expect(toJSON).toBeDefined();
  });

  it(`renders title correctly`, () => {
    const { queryByText } = render(<Header {...defaultProps} />);
    expect(queryByText(defaultProps.title)).toBeTruthy();
  });

  it(`has back button when onBack prop exists`, () => {
    const props: Props = { ...defaultProps, onClose: undefined };
    const { queryByTestId } = render(<Header {...props} />);
    expect(queryByTestId('back')).toBeTruthy();
  });

  it(`does not have back button when onBack prop does not exist`, () => {
    const props: Props = { ...defaultProps, onBack: undefined };
    const { queryByTestId } = render(<Header {...props} />);
    expect(queryByTestId('back')).toBeNull();
  });

  it(`has close button when onClose prop does not exist`, () => {
    const props: Props = { ...defaultProps, onBack: undefined };
    const { queryByTestId } = render(<Header {...props} />);
    expect(queryByTestId('close')).toBeTruthy();
  });

  it(`does not have close button when onClose prop does not exist`, () => {
    const props: Props = { ...defaultProps, onClose: undefined };
    const { queryByTestId } = render(<Header {...props} />);
    expect(queryByTestId('close')).toBeNull();
  });

  it(`calls onPress when its pressed`, () => {
    const onPress = jest.fn(() => {});
    const props: Props = {
      ...defaultProps,
      onClose: undefined,
      onBack: onPress,
    };
    const { getByTestId } = render(<Header {...props} />);
    fireEvent.press(getByTestId('back'));
    expect(onPress).toBeCalled();
  });
});
