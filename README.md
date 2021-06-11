# typed-regex
A typescript library for writing type-safe regular expressions using [named capture groups](https://github.com/tc39/proposal-regexp-named-groups).

[![npm](https://img.shields.io/npm/v/typed-regex)](https://www.npmjs.com/package/typed-regex)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/typed-regex)](https://www.npmjs.com/package/typed-regex)



## Install
To install the latest stable version of typed-regex -
```
yarn add typed-regex
// OR
npm install --save typed-regex
```


## Usage
The type of the result object is infered from the regular expression.

```ts
import { TypedRegEx } from 'typed-regex';

const regex = TypedRegEx('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'g');
const result = regex.captures('2020-12-02');

result // : undefined | { year: string, month: string, day: string }
```

> NOTE: The regular expression has to be a string literal for the types to be valid


#### Optional properties
If the capture group is marked as optional in the regular expression, the generated type will reflect that

```ts
const regex = TypedRegEx('(?<first>\\d+)/(?<second>\\w+)?', 'g');
const result = regex.captures('1234/foobar');

result // : undefined | { first: string, second?: string }
```


#### API Docs
[You can find more information about the library in the API documentation](https://github.com/phenax/typed-regex/blob/main/docs/API.md)


## Browser support
Named capture groups are supported in [these browser](https://caniuse.com/mdn-javascript_builtins_regexp_named_capture_groups)



## License
Typed-Regex is licensed under [MIT](./LICENSE)

