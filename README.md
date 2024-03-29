# lib-esm

A tiny `esm` snippets interop lib.

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
// const libEsm = require('lib-esm').default

const snippets = libEsm({
  window: 'lib-name',
  require: 'lib-name',
  exports: [
    'foo',
    'bar',
  ],
})

console.log(`${snippets.window}\n${snippets.exports}`)
console.log(`${snippets.require}\n${snippets.exports}`)
```

**snippets.window**

```js
const _M_ = window["lib-name"];
```

**snippets.require**

```js
import _M_node_module from "node:module";
const _M_ = _M_node_module.createRequire(import.meta.url)("lib-name");
```

**snippets.exports**

```js
export const foo = _M_.foo;
export const bar = _M_.bar;
const keyword_default = _M_.default || _M_;
export {
  keyword_default as default,
};
```

## API <sub><sup>(Define)</sup></sub>

```ts
/** Lib to ESM code snippets */
function libEsm(options: {
  /**
   * IIFE name
   */
  window?: string;
  /**
   * require id
   */
  require?: string;
  /**
   * export members
   */
  exports?: string[];
  /**
   * Prevent name conflicts
   */
  conflict?: string;
}): {
  /** `window[iife-name]` snippets */
  window: string;
  /** `require(id)` snippets */
  require: string;
  /** `export` snippets */
  exports: string;
  /** Keywords alias */
  keywords: Record<string, string>;
}
```
