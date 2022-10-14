# lib-esm-snippet

Lib to ESM code snippet.

[![NPM version](https://img.shields.io/npm/v/lib-esm-snippet.svg)](https://npmjs.org/package/lib-esm-snippet)
[![NPM Downloads](https://img.shields.io/npm/dm/lib-esm-snippet.svg)](https://npmjs.org/package/lib-esm-snippet)

## Install

```bash
npm i lib-esm-snippet
```

## Usage

```js
import libEsmSnippet from 'lib-esm-snippet'
// or
// const libEsmSnippet = require('lib-esm-snippet')

const result = libEsmSnippet({
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
export default function libEsmSnippet(options: {
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
