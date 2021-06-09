
type RegExParser<Re extends string> =
  Re extends `(?<${infer Key}>${infer Rest}`
    ? { [k in Key]: string } & RegExParser<Rest>
    : Re extends `${infer _Stuff}(?${infer Rest}`
      ? Rest extends string ? RegExParser<`(?${Rest}`> : never
      : {};

type RegExResult<Re extends string> = RegExParser<Re> | null;

class RegExT<Re extends string> {
  regex : RegExp;

  constructor(re: Re, flags: string = '') {
    this.regex = new RegExp(re, flags);
  }
  
  match(str: string) {
    return this.regex.exec(str)?.groups as unknown as RegExResult<Re>;
  }
}

export const RegEx = <Re extends string>(re: Re, flags: string = '') =>
  new RegExT(re, flags);

