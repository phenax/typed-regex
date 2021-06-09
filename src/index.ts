
type RegExParser<Re extends string> =
  Re extends `(?<${infer Key}>${infer Rest}`
    ? { [k in Key]: string } & RegExParser<Rest>
    : Re extends `${infer _Stuff}(?${infer Rest}`
      ? Rest extends string ? RegExParser<`(?${Rest}`> : never
      : {};

type RegExResult<Re extends string> = RegExParser<Re> | null;

export const RegEx = <Re extends string>(re: Re, flags: string = '') => {
  const regexp = new RegExp(re, flags);
  return {
    match: (str: string) => regexp.exec(str)?.groups as unknown as RegExResult<Re>,
  };
};

