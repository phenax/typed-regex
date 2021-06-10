
// TODO: Alternate syntax inside names of capture groups to allow types?
// TODO: (bug) nested * is not set as optional
// TODO: Add exec -> { groups: Res, raw: RawResults }
// TODO: Add test method
// TODO: Create some parse errors in invalid cases

export type RegExCaptureResult<RegexStr extends string> =
  RegexStr extends `(?<${infer Key}>${infer Rest}`
    ? Rest extends `${infer _})${infer Rest}`
      ? Rest extends `?${infer Rest}` | `*${infer Rest}`
        ? { [k in Key]?: string } & RegExCaptureResult<Rest>
        : { [k in Key]: string } & RegExCaptureResult<Rest>
      : { [k in Key]: string } & RegExCaptureResult<Rest> // This should be an error
    : RegexStr extends `${infer _}(?${infer Rest}`
      ? Rest extends string ? RegExCaptureResult<`(?${Rest}`> : never
      : {};

class RegExT<Re extends string> {
  private regex: RegExp;

  constructor(re: Re, flags: string = '') {
    this.regex = new RegExp(re, flags);
  }
  
  match(str: string) {
    return this.regex.exec(str)?.groups as unknown as (RegExCaptureResult<Re> | null);
  }
}

export const TypedRegEx = <Re extends string>(re: Re, flags: string = '') =>
  new RegExT(re, flags);

