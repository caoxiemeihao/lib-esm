declare module 'lib-esm' {
  /** Lib to ESM code snippet. */
  function libEsm(options: {
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
    conflictId?: string;
    /**
     * Generate code snippet format
     * 
     * 🌰 e.g.
     * ```js
     * const _M_ = require("lib") // cjs
     * const _M_ = window["lib"] // iife
     * ```
     * 
     * @default "cjs"
     */
    format?: "cjs" | "iife";
  }): {
    /** `require` snippets. */
    require: string;
    /** `export` snippets. */
    exports: string;
    /** Keywords alias */
    keywords: Record<string, string>;
  }

  export = libEsm;
}
