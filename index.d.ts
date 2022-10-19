declare module 'lib-esm' {
  /** Lib to ESM code snippet. */
  function libEsm(options: {
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
  }): {
    /** `window[iife-name]` snippets. */
    window: string;
    /** `require(id)` snippets. */
    require: string;
    /** `export` snippets. */
    exports: string;
    /** Keywords alias */
    keywords: Record<string, string>;
  }

  export = libEsm;
}
