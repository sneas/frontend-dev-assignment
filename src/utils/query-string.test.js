import { queryString } from './query-string';

describe('queryString', () => {
  it('should return empty string out of empty object', () => {
    expect(queryString({})).toEqual('');
  })

  it('should return valid query string out of non-empty object', () => {
    expect(queryString({a: 'b', b: 'c&d'})).toEqual('a=b&b=c%26d');
  })
});
