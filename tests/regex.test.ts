import { RegEx } from '../src/index';

describe('RegEx', () => {
  it('should parse named capture groups in a type-safe way', () => {
    const r = RegEx('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})', 'g');
    const result = r.match('2015-01-02');
    expect(result?.year).toBe('2015');
    expect(result?.month).toBe('01');
    expect(result?.day).toBe('02');
  });
});

