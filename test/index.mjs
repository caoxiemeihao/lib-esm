import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import libEsm from '../index.mjs';

const cjs_require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const destpath = path.join(__dirname, '__snapshots__');
fs.rmSync(destpath, { recursive: true, force: true });

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
    conflictId: '$$1',
  },
  {
    require: 'iife',
    format: 'iife',
  },
];

for (const opts of maps) {
  const result = libEsm(opts);
  fs.mkdirSync(destpath, { recursive: true });
  fs.writeFileSync(path.join(destpath, `${opts.require}.mjs`), `${result.require}\n${result.exports}`);
}
