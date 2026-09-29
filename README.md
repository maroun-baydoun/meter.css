# meter.css

> A tiny CSS-only library for styling the native HTML `<meter>` element.

This repository is organized as a pnpm workspace:

- `packages/meter-css` — the publishable library
- `packages/test` — Vitest tests
- `apps/demo` — the Vite demo app

The workspace contains the publishable CSS package, a focused demo, and a separate test package.

## Development

```bash
pnpm install
pnpm test
pnpm build
pnpm demo
```

## Principles

`meter.css` styles the native element. It does not replace its semantics, behavior, or HTML API with JavaScript or custom elements.
