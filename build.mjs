import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

// const iswatch = process.argv.slice(2).includes('--watch');
const CJS = {
  __filename: fileURLToPath(import.meta.url),
  __dirname: path.dirname(fileURLToPath(import.meta.url)),
  require: createRequire(import.meta.url),
};

/**
 * @see https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 */
const colours = {
  $_$: c => str => `\x1b[${c}m` + str + '\x1b[0m',
  gary: str => colours.$_$(90)(str),
  cyan: str => colours.$_$(36)(str),
  yellow: str => colours.$_$(33)(str),
  green: str => colours.$_$(32)(str),
  red: str => colours.$_$(31)(str),
};

const filename = path.join(CJS.__dirname, 'index.js');
const destname = filename.replace('.js', '.mjs');
const members = Object.keys(CJS.require(filename));

fs.writeFileSync(destname, CJS.require('.')({ lib: './index.js', members }).snippet);
console.log(
  colours.cyan('[write]'),
  colours.gary(new Date().toLocaleTimeString()),
  destname,
);

console.log(colours.green('build success'));
