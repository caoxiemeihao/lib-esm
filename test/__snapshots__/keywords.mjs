import { createRequire } from "node:module";
const cjs_require = createRequire(import.meta.url);
const _M_$$1 = cjs_require("./keywords");
const _D_$$1 = _M_$$1.default || _M_$$1;
export {
  _D_$$1 as default,
  keyword_delete as delete,
};
export const foo = _M_$$1.foo;
export const bar = _M_$$1.bar;