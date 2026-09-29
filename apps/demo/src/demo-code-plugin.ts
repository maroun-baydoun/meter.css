import type { Plugin } from "vite";

import { renderHighlightedCode } from "./highlight";

type SnippetMap = Record<string, string>;
type SnippetLanguage = "typescript" | "tsx" | "shell" | "html";

export function demoCodePlugin(snippets: SnippetMap): Plugin {
  return {
    name: "demo-code-plugin",
    transformIndexHtml(html: string) {
      return html.replace(
        /<code([^>]*data-code="([^"]+)"[^>]*)><\/code>/g,
        (_match, attrs: string, key: string) => {
          const snippet = snippets[key];
          const languageMatch = attrs.match(/data-language="([^"]+)"/);
          const language = languageMatch?.[1] as SnippetLanguage | undefined;

          if (!snippet) {
            return `<code${attrs}></code>`;
          }

          return `<code${attrs}>${renderHighlightedCode(snippet, language)}</code>`;
        },
      );
    },
  };
}
