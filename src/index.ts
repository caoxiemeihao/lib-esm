export interface Options {
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
}

const keywords = [
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_words
  ...[
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'false',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'new',
    'null',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'true',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    // The following are only reserved when they are found in strict mode code
    'const',
    'let',
    'static',
    'yield',
    // The following are only reserved when they are found in module code or async function bodies
    'await',
  ],
  ...[
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#future_reserved_words
    'enum',
    // The following are only reserved when they are found in strict mode code
    'implements',
    'interface',
    'package',
    'private',
    'protected',
    'public',
    // Future reserved words in older standards
    // The following are reserved as future keywords by older ECMAScript specifications (ECMAScript 1 till 3).
    'abstract',
    'boolean',
    'byte',
    'char',
    'double',
    'final',
    'float',
    'goto',
    'int',
    'long',
    'native',
    'short',
    'synchronized',
    'throws',
    'transient',
    'volatile',
  ],
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#identifiers_with_special_meanings
  ...[
    'arguments',
    'as',
    'async',
    'eval',
    'from',
    'get',
    'of',
    'set',
  ],
]

/** Lib to ESM code snippets */
export default function libEsm(options: Options) {
  const {
    window,
    require: require2,
    exports: members = [],
    conflict = '',
  } = options
  const _M_ = '_M_' + conflict
  const windowSnippet = window == null ? '' : `const ${_M_} = window["${window}"];`
  const requireSnippet = require2 == null ? '' : `
import { createRequire } from "node:module";
const ${_M_} = createRequire(import.meta.url)("${require2}");
`.trim()

  !members.includes('default') && members.push('default')

  const alias: Record<string, string> = members
    .filter(member => keywords.includes(member))
    .reduce((memo, keyword) => Object.assign(memo, { [keyword]: `keyword_${keyword + conflict}` }), {})
  const exportsSnippet = `
${members.map(member => {
    const LV = alias[member] ? `const ${alias[member]}` : `export const ${member}`
    const RV = member === 'default' ? `${_M_}.default || ${_M_}` : `${_M_}.${member}`
    return `${LV} = ${RV};`
  }).join('\n')}
export {
  ${Object.entries(alias).map(([member, alias]) => `${alias} as ${member},`).join('\n  ')}
};
`.trim()

  return {
    /** `window[iife-name]` snippets */
    window: windowSnippet,
    /** `require(id)` snippets */
    require: requireSnippet,
    /** `export` snippets */
    exports: exportsSnippet,
    /** Keywords alias */
    keywords: alias,
  }
}
