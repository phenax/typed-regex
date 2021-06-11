# API docs


## Example

```ts
import { TypedRegEx } from 'typed-regex';

const regex = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'g');
const captures = regex.captures('2020-12-02'); // : undefined | { year: string, month: string, day: string }
const match = regex.match('2020-12-02'); // : { matched: boolean, groups?: { year: string, month: string, day: string }, raw?: RegExpExecArray }
const isMatch = regex.isMatch('2020-12-02'); // : boolean
```


---


## Exports

#### `TypedRegEx`

Signature -
```ts
TypedRegEx<Re extends string, Fl extends string>
: (regex: Re, flags?: FlagChecker<Fl> & Fl) => TypedRegExT<Re>
```

* `regex`: (Eg - `(?<name>\\w+)`) Regular expression as a string literal. The capture groups in the regex are used to construct the type.
* `flags`: (Eg - `gmi`) [RegExp flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags) as a string literal. The flags are type checked so any invalid flag characters will result in an typescript error.

Example -
```ts
const regex = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'gi');
```


---


## Methods

#### `captures`
Extract the captures from the regular expression

Signature -
```ts
TypedRegEx<Regex>#captures
: (str: string) => RegExCaptureResult<Regex>
```

Spec -
```ts
const r = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');
const result = r.captures('2020-12-02');
expect(result).not.toBeNull();
expect(result?.year).toBe('2020');
expect(result?.month).toBe('12');
expect(result?.day).toBe('02');
```


#### `match`
Get the capture groups along with the raw data from `RegExp#exec` call

Signature -
```ts
TypedRegEx<Regex>#match
: (str: string) => RegExMatchResult<Regex>
```

Spec -
```ts
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
```


#### `isMatch`
Check if a string matches regex (Equivalent to `RegExp#test`)

Signature -
```ts
TypedRegEx<Regex>#isMatch
: (str: string) => boolean
```

Spec -
```ts
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
```


---


## Types


#### `RegExMatchResult`
```ts
type RegExMatchResult<Re extends string> = {
  matched: boolean;
  groups?: RegExCaptureResult<Re>;
  raw?: RegExpExecArray;
};
```


#### `RegExCaptureResult`
```ts
type RegExCaptureResult<Re extends string> = never | <infered type>;
```


#### `TypedRegExT`
```ts
class TypedRegExT<Re extends string> {
  <methods>
}
```

