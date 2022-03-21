import React from 'react';
import { render } from '@src/util';
import { SettingsHomePresenter, Props } from './SettingsHomePresenter';

describe(`SettingsHomePresenter`, () => {
  const defaultProps: Props = {
    menuItems: [
      {
        title: 'test',
        onPress: jest.fn(() => {}),
      },
    ],
  };

  it(`renders correctly`, () => {
    const { toJSON } = render(<SettingsHomePresenter {...defaultProps} />);
    expect(toJSON).toBeDefined();
  });

  it(`renders menu item title`, () => {
    const { queryByText } = render(<SettingsHomePresenter {...defaultProps} />);
    expect(queryByText('test')).toBeDefined();
  });
});
