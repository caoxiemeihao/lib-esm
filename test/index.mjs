import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import libEsmSnippet from '../index.mjs';

const cjs_require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const destpath = path.join(__dirname, '__snapshots__');
fs.rmSync(destpath, { recursive: true, force: true });

/** @type {Parameters<import('..')['default']>[0][]} */
const maps = [
  {
    lib: 'path',
    members: Object.keys(cjs_require('path')),
  },
  {
    lib: './keywords',
    members: [
      'default',
      'delete',
      'foo',
      'bar',
    ],
    conflictId: '$$1',
  },
  {
    lib: 'iife',
    format: 'iife',
  },
];

for (const opts of maps) {
  const result = libEsmSnippet(opts);
  fs.mkdirSync(destpath, { recursive: true });
  fs.writeFileSync(path.join(destpath, `${opts.lib}.mjs`), result.snippet);
}
