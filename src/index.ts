
type RegexpParser<Re extends string> =
  Re extends `(?<${infer Key}>${infer Rest}`
    ? { [k in Key]: string } & RegexpParser<Rest>
    : Re extends `${infer _Stuff}(?${infer Rest}`
      ? Rest extends string ? RegexpParser<`(?${Rest}`> : never
      : {};

export const Regex = <Re extends string>(re: Re, flags: string = '') => {
  const regexp = new RegExp(re, flags);
  return {
    match: (str: string): RegexpParser<Re> => regexp.exec(str) as any,
  };
};

