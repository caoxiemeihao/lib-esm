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

/** @type {import('.')['default']} */
module.exports = function libEsm(options) {
  const {
    lib,
    members = [],
    conflictId = '',
    format = 'cjs',
  } = options;
  const _M_ = '_M_' + conflictId;
  const importStatement = format === 'cjs'
    ? `
import { createRequire } from "node:module";
const cjs_require = createRequire(import.meta.url);
const ${_M_} = cjs_require("${lib}");
`.trim()
    : `
const ${_M_} = window["${lib}"];
`.trim();

  !members.includes('default') && members.push('default');

  const alias = members
    .filter(member => keywords.includes(member))
    .reduce((memo, keyword) => Object.assign(memo, { [keyword]: `keyword_${keyword + conflictId}` }), {});
  const exportsSnippet = `
${members.map(member => {
    const RV = member === 'default' ? `${_M_}.default || ${_M_}` : `${_M_}.${member}`;
    return `export const ${alias[member] || member} = ${RV};`;
  }).join('\n')}
export {
  ${Object.entries(alias).map(([member, alias]) => `${alias} as ${member},`).join('\n  ')}
};
`.trim();

  return {
    snippet: `${importStatement}\n${exportsSnippet}`,
    exports: exportsSnippet,
    keywords: alias,
  };
};
