import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { strict as assert } from 'node:assert';
import libEsm from '../dist/index.mjs';

const TAG = '[test]';
const cjs_require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const destpath = path.join(__dirname, '__snapshots__');

fs.rmSync(destpath, { recursive: true, force: true });
fs.mkdirSync(destpath, { recursive: true });

/** @type {Parameters<import('lib-esm')>[0][]} */
const maps = [
  {
    require: 'path',
    exports: Object.keys(cjs_require('path')),
  },
  {
    require: './keywords',
    exports: [
      'default',
      'delete',
      'foo',
      'bar',
    ],
    conflict: '$$1',
  },
  {
    window: 'iife-name',
  },
];

for (const opts of maps) {
  const snippets = libEsm(opts);
  const key = opts.window ? 'window' : 'require'
  const filename = path.join(destpath, `${opts[key]}.mjs`);
  fs.writeFileSync(filename, `${snippets[key]}\n${snippets.exports}`);
}

const pathESM = await import('./__snapshots__/path.mjs');
const esmkeys = Object.keys(pathESM);
const cjskeys = Object.keys(path);
for (const key of esmkeys) {
  if (key === 'default') continue;
  assert.equal(cjskeys.includes(key), true);
}

console.log(TAG, 'index.mjs passed ✅');
