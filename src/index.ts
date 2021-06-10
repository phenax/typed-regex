
// TODO: Alternate syntax inside names of capture groups to allow types?
// TODO: (bug) nested * is not set as optional

type RegExParser<RegexStr extends string> =
  RegexStr extends `(?<${infer Key}>${infer Rest}`
    ? Rest extends `${infer _})${infer Rest}`
      ? Rest extends `?${infer Rest}` | `*${infer Rest}`
        ? { [k in Key]?: string } & RegExParser<Rest>
        : { [k in Key]: string } & RegExParser<Rest>
      : { [k in Key]: string } & RegExParser<Rest>
    : RegexStr extends `${infer _}(?${infer Rest}`
      ? Rest extends string ? RegExParser<`(?${Rest}`> : never
      : {};

type RegExResult<Re extends string> = RegExParser<Re> | null;

class RegExT<Re extends string> {
  private regex : RegExp;

  constructor(re: Re, flags: string = '') {
    this.regex = new RegExp(re, flags);
  }
  
  match(str: string) {
    return this.regex.exec(str)?.groups as unknown as RegExResult<Re>;
  }
}

export const RegEx = <Re extends string>(re: Re, flags: string = '') =>
  new RegExT(re, flags);

