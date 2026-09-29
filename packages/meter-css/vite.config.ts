import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

const sourceDirectory = resolve(import.meta.dirname, "src");

const buildEntries: Record<
  string,
  { entry: string; selector: string; cssFile: string }
> = {
  global: {
    entry: "styles.css",
    selector: "meter",
    cssFile: "global.css",
  },
  class: {
    entry: "styles.css",
    selector: ".meter",
    cssFile: "class.css",
  },
};

function replaceSelector(selector: string): Plugin {
  return {
    name: "meter-css-selector",
    transform(source, id) {
      if (id === resolve(sourceDirectory, "styles.css")) {
        return source.replaceAll("__METER_SELECTOR__", selector);
      }

      return undefined;
    },
  };
}

export default defineConfig(({ mode }) => {
  const buildEntry = buildEntries[mode] ?? buildEntries.global;

  return {
    plugins: [replaceSelector(buildEntry.selector)],
    build: {
      emptyOutDir: mode === "global",
      rollupOptions: {
        input: resolve(sourceDirectory, buildEntry.entry),
        output: {
          assetFileNames: buildEntry.cssFile,
        },
      },
    },
  };
});
