import { render } from '@src/util';
import { HomePresenter } from './HomePresenter';
import React from 'react';

describe(`HomePresenter`, () => {
  it(`renders correctly`, () => {
    const { toJSON } = render(<HomePresenter />);
    expect(toJSON).toBeDefined();
  });
});
