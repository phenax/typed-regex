// TODO: (bug) nested * is not set as optional
// TODO: Create some parse errors in invalid cases
// TODO: Parse normal captures in a typed tuple?
// TODO: Ignore non-capturing groups

type ReError<T extends string> = { type: T };

// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp
type Flag = 'd' | 'g' | 'i' | 'm' | 's' | 'u' | 'y';

type FlagChecker<Fl extends string> =
  Fl extends '' ? string
  : Fl extends `${Flag}${infer rest}` ? FlagChecker<rest>
  : ReError<`Invalid flag used: ${Fl}`>;

export type RegExCaptureResult<Re extends string> =
  Re extends `(?<${infer key}>${infer rest}`
    ? rest extends `${infer _})${infer rest}`
      ? rest extends `?${infer rest}` | `*${infer rest}`
        ? { [k in key]?: string } & RegExCaptureResult<rest>
        : { [k in key]: string } & RegExCaptureResult<rest>
      : never
    : Re extends `${infer _}(?<${infer rest}`
      ? RegExCaptureResult<`(?<${rest}`>
      : {};

export type RegExMatchResult<Re extends string> = {
  matched: boolean;
  groups?: RegExCaptureResult<Re>;
  raw?: RegExpMatchArray;
};

export class TypedRegExT<Re extends string> {
  private _regexString: Re;
  private _flags: string;

  private getRegex(): RegExp {
    return new RegExp(this._regexString, this._flags);
  }

  constructor(re: Re, flags: string = '') {
    this._regexString = re;
    this._flags = flags;
  }

  isMatch = (str: string): boolean => this.getRegex().test(str);

  private _toMatchResult = (raw: RegExpMatchArray | null): RegExMatchResult<Re> => ({
    matched: !!raw,
    groups: raw?.groups as any,
    raw: raw || undefined,
  });

  match = (str: string): RegExMatchResult<Re> =>
     this._toMatchResult(this.getRegex().exec(str));

  matchAll = (str: string): Array<RegExMatchResult<Re>> => {
    const re = this.getRegex();
    return Array.from(str.matchAll(re)).map(this._toMatchResult);
  };

  captures = (str: string): RegExCaptureResult<Re> | undefined =>
    this.match(str).groups;

  captureAll = (str: string): Array<RegExCaptureResult<Re> | undefined> =>
    this.matchAll(str).map(r => r.groups);
}

export const TypedRegEx = <Re extends string, Fl extends string>(
  re: Re,
  flags?: FlagChecker<Fl> & Fl
) => new TypedRegExT(re, flags);
