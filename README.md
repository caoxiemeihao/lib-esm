# lib-esm

Lib to ESM code snippet.

[![NPM version](https://img.shields.io/npm/v/lib-esm.svg)](https://npmjs.org/package/lib-esm)
[![NPM Downloads](https://img.shields.io/npm/dm/lib-esm.svg)](https://npmjs.org/package/lib-esm)

## Install

```bash
npm i lib-esm
```

## Usage

```js
import libEsm from 'lib-esm'
// or
// const libEsm = require('lib-esm')

const result = libEsm({
  lib: 'lib-name',
  members: [
    'foo',
    'bar',
  ],
});

console.log(result.snippet);
```

###### Output

CommonJs format

```js
import { createRequire } from "node:module";
const cjs_require = createRequire(import.meta.url);
const _M_ = cjs_require("lib-name");
export const foo = _M_.foo;
export const bar = _M_.bar;
export const keyword_default = _M_.default || _M_;
export {
  keyword_default as default,
};
```

IIFE format

```js
const _M_ = window["lib-name"];
export const foo = _M_.foo;
export const bar = _M_.bar;
export const keyword_default = _M_.default || _M_;
export {
  keyword_default as default,
};
```

## API <sub><sup>(Define)</sup></sub>

```ts
export default function libEsm(options: {
  /**
   * lib name
   */
  lib: string;
  /**
   * export members
   */
  members?: string[];
  /**
   * Prevent naming conflicts
   */
  conflictId?: string;
  /**
   * Generate code snippet format
   * 
   * 🌰 e.g.
   * ```js
   * const _M_ = require("lib") // cjs
   * const _M_ = window["lib"] // iife
   * ```
   * 
   * @default "cjs"
   */
  format?: "cjs" | "iife";
}): {
  snippet: string;
  /** Only `export` snippets. */
  exports: string;
  /** Keywords alias */
  keywords: Record<string, string>;
}
```
