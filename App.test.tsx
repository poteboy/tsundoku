import React from 'react';
import { render } from '@src/util';
import App from './App';

describe(`<App />`, () => {
  it(`renders correctly`, () => {
    const { toJSON } = render(<App />);
    expect(toJSON).toBeDefined();
  });
});
