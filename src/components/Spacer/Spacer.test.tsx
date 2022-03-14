import React from 'react';
import { Spacer } from './Spacer';
import { render } from '@src/util';

describe(`Spacer`, () => {
  it(`has one component`, async () => {
    const { queryByTestId, queryAllByTestId } = render(<Spacer size={0} />);
    expect(queryByTestId('spacer')).toBeTruthy();
    expect(queryAllByTestId('spacer')).toHaveLength(1);
  });
});
