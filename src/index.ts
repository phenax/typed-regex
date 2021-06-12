// TODO: Alternate syntax inside names of capture groups to allow types?
// TODO: (bug) nested * is not set as optional
// TODO: Create some parse errors in invalid cases
// TODO: Parse normal captures in a typed tuple?
// TODO: Ignore non-capturing groups

type ReError<T extends string> = { type: T };

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
  raw?: RegExpExecArray;
};

export class TypedRegExT<Re extends string> {
  private regex: RegExp;

  constructor(re: Re, flags: string = '') {
    this.regex = new RegExp(re, flags);
  }

  isMatch = (str: string): boolean => this.regex.test(str);

  match = (str: string): RegExMatchResult<Re> => {
    const rawResult = this.regex.exec(str);

    return {
      matched: !!rawResult,
      groups: (rawResult?.groups || undefined) as any,
      raw: rawResult || undefined,
    };
  };

  captures = (str: string): RegExCaptureResult<Re> | undefined =>
    this.match(str).groups;
}

export const TypedRegEx = <Re extends string, Fl extends string>(
  re: Re,
  flags?: FlagChecker<Fl> & Fl
) => new TypedRegExT(re, flags);
