// TODO: Alternate syntax inside names of capture groups to allow types?
// TODO: (bug) nested * is not set as optional
// TODO: Create some parse errors in invalid cases

type Flags = "d" | "g" | "i" | "m" | "s" | "u" | "y";

export type FlagChecker<FlagsStr extends string> =
  FlagsStr extends `${Flags}${infer FlagsStr}`
    ? FlagChecker<FlagsStr>
    : FlagsStr extends ""
    ? string
    : never;

export type RegExCaptureResult<RegexStr extends string> =
  RegexStr extends `(?<${infer Key}>${infer Rest}`
    ? Rest extends `${infer _})${infer Rest}`
      ? Rest extends `?${infer Rest}` | `*${infer Rest}`
        ? { [k in Key]?: string } & RegExCaptureResult<Rest>
        : { [k in Key]: string } & RegExCaptureResult<Rest>
      : { [k in Key]: string } & RegExCaptureResult<Rest> // This should be an error
    : RegexStr extends `${infer _}(?${infer Rest}`
    ? Rest extends string
      ? RegExCaptureResult<`(?${Rest}`>
      : never
    : {};

export type RegExExecResult<Re extends string> = {
  matched: boolean;
  groups?: RegExCaptureResult<Re>;
  raw?: RegExpExecArray;
};

export class TypedRegExT<Re extends string> {
  private regex: RegExp;

  constructor(re: Re, flags: string = "") {
    this.regex = new RegExp(re, flags);
  }

  isMatch = (str: string): boolean => this.regex.test(str);

  match = (str: string): RegExExecResult<Re> => {
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

export const TypedRegEx = <Re extends string, FlagsStr extends string>(
  re: Re,
  flags?: FlagsStr & FlagChecker<FlagsStr>
) => new TypedRegExT(re, flags);
