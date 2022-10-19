// https://www.w3schools.com/js/js_reserved.asp
const keywords = [
  'abstract',
  'arguments',
  'await',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'function',
  'goto',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'int',
  'interface',
  'let',
  'long',
  'native',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'volatile',
  'while',
  'with',
  'yield',
];

/** @type {import('lib-esm')} */
module.exports = function libEsm(options) {
  const {
    window,
    require: require2,
    exports: members = [],
    conflict = '',
  } = options;
  const _M_ = '_M_' + conflict;
  const windowSnippet = window == null ? '' : `const ${_M_} = window["${window}"];`;
  const requireSnippet = require2 == null ? '' : `
import { createRequire } from "node:module";
const ${_M_} = createRequire(import.meta.url)("${require2}");
`.trim();

  !members.includes('default') && members.push('default');

  const alias = members
    .filter(member => keywords.includes(member))
    .reduce((memo, keyword) => Object.assign(memo, { [keyword]: `keyword_${keyword + conflict}` }), {});
  const exportsSnippet = `
${members.map(member => {
    const LV = alias[member] ? `const ${alias[member]}` : `export const ${member}`;
    const RV = member === 'default' ? `${_M_}.default || ${_M_}` : `${_M_}.${member}`;
    return `${LV} = ${RV};`;
  }).join('\n')}
export {
  ${Object.entries(alias).map(([member, alias]) => `${alias} as ${member},`).join('\n  ')}
};
`.trim();

  return {
    window: windowSnippet,
    require: requireSnippet,
    exports: exportsSnippet,
    keywords: alias,
  };
};
