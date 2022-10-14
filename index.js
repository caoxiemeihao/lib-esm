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
module.exports = function libEsmSnippet(options) {
  const {
    lib,
    members = [],
    conflictId = '',
    format = 'cjs',
  } = options;
  const _M_ = '_M_' + conflictId;
  const _D_ = '_D_' + conflictId;

  const importStatement = format === 'cjs'
    ? `
import { createRequire } from "node:module";
const cjs_require = createRequire(import.meta.url);
const ${_M_} = cjs_require("${lib}");
`.trim()
    : `
const ${_M_} = window["${lib}"];
`.trim();

  const alias = members
    .filter(member => member !== 'default')
    .filter(member => keywords.includes(member))
    .map(keyword => [`keyword_${keyword}`, keyword]);
  const exports = members.filter(member => !keywords.includes(member));
  const defineSnippet = `
${importStatement}
const ${_D_} = ${_M_}.default || ${_M_};
`.trim();
  const exportsSnippet = `
export {
  ${[[_D_, 'default'], ...alias].map(([k, v]) => `${k} as ${v},`).join('\n  ')}
};
${exports.map(member => `export const ${member} = ${_M_}.${member};`).join('\n')}
`.trim();

  return {
    snippet: `${defineSnippet}\n${exportsSnippet}`,
    exports: exportsSnippet,
  };
};
