import { convertDate } from './lib';
import { mockTimeStamp } from '@src/entities';

describe(`convertDate`, () => {
  it(`returns date when arg is date`, () => {
    expect(convertDate(new Date())).toBeInstanceOf(Date);
  });
  it(`returns date when arg is timestamp`, () => {
    expect(convertDate(mockTimeStamp)).toBeInstanceOf(Date);
  });
});
