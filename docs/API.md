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

**Signature -**
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
Extract the typed capture groups from the regular expression
Returns capture groups of type [RegExCaptureResult](#RegExCaptureResult).

**Signature -**
```ts
TypedRegEx<Regex>#captures
: (str: string) => RegExCaptureResult<Regex>
```

**Spec -**
```ts
const r = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');
const result = r.captures('2020-12-02');
expect(result).not.toBeNull();
expect(result?.year).toBe('2020');
expect(result?.month).toBe('12');
expect(result?.day).toBe('02');
```


#### `captureAll`
Extract all the capture groups from the regular expression as an array of typed results
Returns the an array of typed capture groups of type Array<[RegExCaptureResult](#RegExCaptureResult)>.

**Signature -**
```ts
TypedRegEx<Regex>#captureAll
: (str: string) => Array<RegExCaptureResult<Regex>>
```

**Spec -**
```ts
const namesRegex = TypedRegEx('((?<firstName>\\w+) (?<middleName>\\w+)? (?<lastName>\\w+))+', 'g');
const result = namesRegex.captureAll('Joe  Mama,Ligma  Bolz,Sir Prysing Lee');
expect(result).toEqual([
    { firstName: 'Joe', lastName: 'Mama' },
    { firstName: 'Ligma', lastName: 'Bolz' },
    { firstName: 'Sir', middleName: 'Prysing', lastName: 'Lee' },
]);
```



#### `match`
Equivalent to calling [`RegExp#exec`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) once.
Returns the matched result with typed capture groups of type [RegExMatchResult](#RegExMatchResult).

Signature -
**Signature -**
```ts
TypedRegEx<Regex>#match
: (str: string) => RegExMatchResult<Regex>
```

**Spec -**
```ts
const r = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');
const result = r.match('2020-12-02');
expect(result).toEqual({
  matched: true,
  raw: [/* raw output of match */],
  groups: {
    year: '2020',
    month: '12',
    day: '02',
  },
});
```


#### `matchAll`
Equivalent to [`String#matchAll`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll). Returns a list of matched results with typed capture groups
Returns the an array of matched result with typed capture groups of type [RegExMatchAllResult](#RegExMatchAllResult).

**Signature -**
```ts
TypedRegEx<Regex>#matchAll
: (str: string) => RegExMatchAllResult<Regex>
```

**Spec -**
```ts
const namesRegex = TypedRegEx('((?<firstName>\\w+) (?<middleName>\\w+)? (?<lastName>\\w+))+', 'g');

const result = namesRegex.matchAll('Joe  Mama,Ligma  Bolz,Sir Prysing Lee');
expect(result).toEqual([
  {
    groups: { firstName: 'Joe', lastName: 'Mama' },
    raw: [/* raw output of match */],
  },
  {
    groups: { firstName: 'Ligma', lastName: 'Bolz' }
    raw: [/* raw output of match */],
  },
  {
    groups: { firstName: 'Sir', middleName: 'Prysing', lastName: 'Lee' }
    raw: [/* raw output of match */],
  },
]);
```


#### `isMatch`
Check if a string matches regex (Equivalent to [`RegExp#test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test))

**Signature -**
```ts
TypedRegEx<Regex>#isMatch
: (str: string) => boolean
```

**Spec -**
```ts
const r = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$');
expect(r.isMatch('2020-12-02')).toBe(true);
expect(r.isMatch('foobar')).toBe(false);
```


---


## Types


#### RegExMatchResult
```ts
type RegExMatchResult<Re extends string> = {
  matched: boolean;
  groups?: RegExCaptureResult<Re>;
  raw?: RegExpExecArray;
};
```

#### RegExMatchAllResult
```ts
export type RegExMatchAllResult<Re extends string> = Array<{
  groups?: RegExCaptureResult<Re>;
  raw: RegExpMatchArray;
}>
```


#### RegExCaptureResult
```ts
type RegExCaptureResult<Re extends string> = never | <infered type>;
```


#### TypedRegExT
```ts
class TypedRegExT<Re extends string> {
  <methods>
}
```

