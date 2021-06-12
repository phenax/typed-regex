import { TypedRegEx } from '../src/index';

describe('TypedRegEx', () => {
  describe('#captures', () => {
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

  describe('#captureAll', () => {
    const namesRegex = TypedRegEx('((?<firstName>\\w+) (?<middleName>\\w+)? (?<lastName>\\w+))+', 'g');

    it('should capture all names in string', () => {
      const result = namesRegex.captureAll('Joe  Mama,Ligma  Bolz,Sir Prising Lee');
      expect(result).toEqual([
        { firstName: 'Joe', lastName: 'Mama' },
        { firstName: 'Ligma', lastName: 'Bolz' },
        { firstName: 'Sir', middleName: 'Prising', lastName: 'Lee' },
      ]);
    });

    it('should return empty array if no matches', () => {
      // no match
      expect(namesRegex.captureAll('932408239')).toEqual([]);

      // empty string
      expect(namesRegex.captureAll('')).toEqual([]);
    });
  });

  describe('#match', () => {
    const dataRegex = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');

    it('should extract year/month/day groups', () => {
      const result = dataRegex.match('2020-12-02');
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
      const result = dataRegex.match('2020-12');
      expect(result).toEqual({ matched: false });
    });
  });

  describe('#matchAll', () => {
    const namesRegex = TypedRegEx('((?<firstName>\\w+) (?<middleName>\\w+)? (?<lastName>\\w+))+', 'g');

    it('should capture all names in string', () => {
      const result = namesRegex.matchAll('Joe  Mama,Ligma  Bolz,Sir Prising Lee');
      // skips raw value testing
      expect(result.map(r => ({ ...r, raw: undefined }))).toEqual([
        {
          groups: { firstName: 'Joe', lastName: 'Mama' },
        },
        {
          groups: { firstName: 'Ligma', lastName: 'Bolz' }
        },
        {
          groups: { firstName: 'Sir', middleName: 'Prising', lastName: 'Lee' }
        },
      ]);
    });

    it('should return empty array if no matches', () => {
      // no match
      expect(namesRegex.matchAll('932408239')).toEqual([]);

      // empty string
      expect(namesRegex.matchAll('')).toEqual([]);
    });
  });


  describe('#isMatch', () => {
    it('should check if pattern matches year/month/day', () => {
      const r = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');
      expect(r.isMatch('2020-12-02')).toBe(true);
      expect(r.isMatch('2020-12')).toBe(false);
    });
  });


  describe('flags', () => {
    it('should allow all allowed flags', () => {
      TypedRegEx('^foo(?<name>\\w)*', 'gimsuy'); // `d` unused as it throws a runtime error
    });
  });

  describe('bugs', () => {
    it('should non yield ts type error on using non-capturing groups', () => {
      // https://github.com/phenax/typed-regex/issues/1
      const r = TypedRegEx('^foo(?:\\w)(?<name>.*)$');
      const result = r.captures('foobar');
      expect(result).not.toBeNull();
      expect(result?.name).toBe('ar');
    });
  });
});

