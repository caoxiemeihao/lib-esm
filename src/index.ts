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

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_words
const keywords = [
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
]

/** Lib to ESM code snippet. */
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
    window: windowSnippet,
    require: requireSnippet,
    exports: exportsSnippet,
    keywords: alias,
  }
}
