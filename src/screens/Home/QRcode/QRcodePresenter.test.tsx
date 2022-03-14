import { QRcodePresenter } from './QRcodePresenter';
import { render } from '@src/util';
import React from 'react';

describe(`QRcodePresenter`, () => {
  it(`renders correctly`, () => {
    const component = render(<QRcodePresenter />);
    expect(component).toBeDefined();
  });
});
