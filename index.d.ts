/** Lib to ESM code snippet. */
export default function libEsmSnippet(options: {
  /**
   * lib name
   */
  lib: string;
  /**
   * export members
   */
  members?: string[];
  /**
   * Prevent naming conflicts
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
  snippet: string;
}
