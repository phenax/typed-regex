import { Regex } from '../src/index';

describe('regex', () => {
  it('should do stuff', () => {
    const r = Regex('(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})', 'g');
    const result = r.match('2015-01-02');
    console.log(result);
    expect(1).toBe(1);
  });
});

