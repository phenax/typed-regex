import { TypedRegEx } from '../src/index';

describe('TypedRegEx', () => {
  describe('#match', () => {
    it('should extract year/month/day groups', () => {
      const r = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');
      const result = r.captures('2020-12-02');
      expect(result).not.toBeNull();
      expect(result?.year).toBe('2020');
      expect(result?.month).toBe('12');
      expect(result?.day).toBe('02');
    });

    it('should extract optional groups', () => {
      const r = TypedRegEx('foo(?<name>.*)?');
      const result = r.captures('hello worldfoobar');
      expect(result).not.toBeNull();
      expect(result?.name).toBe('bar');

      // no match case
      expect(r.captures('hello world')?.name).toBeUndefined();
    });

    it('should extract 0 or more (*) applied on capture groups', () => {
      const r = TypedRegEx('^foo(?<name>\\w)*', 'gi');
      const result = r.captures('foobar');
      expect(result).not.toBeNull();
      expect(result?.name).toBe('r');
    });
  });

  describe('#test', () => {
    it('should check if pattern matches year/month/day', () => {
      const r = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');
      expect(r.isMatch('2020-12-02')).toBe(true);
      expect(r.isMatch('2020-12')).toBe(false);
    });
  });

  describe('#exec', () => {
    it('should extract year/month/day groups', () => {
      const r = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');
      const result = r.match('2020-12-02');
      expect({ ...result, raw: [...(result.raw || [])] }).toEqual({
        matched: true,
        raw: ["2020-12-02", "2020", "12", "02"],
        groups: {
          year: '2020',
          month: '12',
          day: '02',
        },
      });
    });

    it('should return matched: false if string doesnt match pattern', () => {
      const r = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');

      const result = r.match('2020-12');
      expect(result).toEqual({ matched: false });
    });
  });
});

