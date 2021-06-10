import { TypedRegEx } from '../src/index';

describe('TypedRegEx', () => {
  it('should extract year/month/day groups', () => {
    const r = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');
    const result = r.match('2020-12-02');
    expect(result).not.toBeNull();
    expect(result?.year).toBe('2020');
    expect(result?.month).toBe('12');
    expect(result?.day).toBe('02');
  });

  it('should extract optional groups', () => {
    const r = TypedRegEx('foo(?<name>.*)?');
    const result = r.match('hello worldfoobar');
    expect(result).not.toBeNull();
    expect(result?.name).toBe('bar');

    // no match case
    expect(r.match('hello world')?.name).toBeUndefined();
  });

  it('should extract 0 or more (*) applied on capture groups', () => {
    const r = TypedRegEx('^foo(?<name>\\w)*', 'gi');
    const result = r.match('foobar');
    expect(result).not.toBeNull();
    expect(result?.name).toBe('r');
  });
});

