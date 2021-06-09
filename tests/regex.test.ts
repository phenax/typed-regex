import { RegEx } from '../src/index';

describe('RegEx', () => {
  it('should parse named capture groups in a type-safe way', () => {
    const r = RegEx('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/(?<foobar>.*)?', 'g');
    const result = r.match('2020-12-02/hello world');
    expect(result).not.toBeNull();
    expect(result?.year).toBe('2020');
    expect(result?.month).toBe('12');
    expect(result?.day).toBe('02');
  });
});

