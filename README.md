# ts-markdown

A TypeScript library for generating [Markdown](https://commonmark.org) content programmatically.

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- Two styles: **Fluent Builder** and **Pipeline**
- AST-based internals for structured document manipulation
- Composable lists — nest `list()` / `task()` freely:
  - Headings (h1, h2, h3)
  - Text, Links & Images
  - Code blocks with syntax highlighting
  - [x] Composable & nestable lists
  - [ ] Tables
  - [ ] Blockquotes

## Installation

```bash
npm install @nikifutaki/ts-markdown
```

## Usage

### Builder Pattern

Use the `Markdown` class for a fluent, chainable API:

```typescript
import { Markdown } from '@nikifutaki/ts-markdown';

const doc = new Markdown()
  .h1('My Document')
  .text('Hello, world!')
  .list(['Item 1', 'Item 2'])
  .code('console.log(42);', { language: 'typescript' })
  .toString();
```

### Pipeline Pattern

Use `pipe()` with standalone functions for a functional style:

```typescript
import { pipe, md, h1, text, list, code, render } from '@nikifutaki/ts-markdown';

const doc = pipe(
  md(),
  h1('My Document'),
  text('Hello, world!'),
  list(['Item 1', 'Item 2']),
  code('console.log(42);', 'typescript'),
);

console.log(render(doc));
```

### Composable Lists

Nest `list()` and `task()` inside each other freely:

```typescript
import { list, task } from '@nikifutaki/ts-markdown';

list([
  'Regular item',
  list(['Sub-item A', 'Sub-item B']),
  task([
    { text: 'Done', checked: true },
    { text: 'Todo', checked: false },
  ]),
])
```

Output:

- Regular item
  - Sub-item A
  - Sub-item B
  - [x] Done
  - [ ] Todo

### Mixing Both Styles

The Builder's `.pipe()` accepts both `MdNode` values and transform functions:

```typescript
import { Markdown, list } from '@nikifutaki/ts-markdown';

const doc = new Markdown()
  .h1('Project')
  .pipe(list(['Feature A', 'Feature B']))
  .toString();
```

## API Reference

### Builder Class

All methods return `this` for chaining:

- Headings
  - `h1(text): this`
  - `h2(text): this`
  - `h3(text): this`
- `text(text): this` - Plain text
- `link(text, url): this` - Hyperlink
- `image(alt, url): this` - Image
- `code(code, options?): this` - Code block (`options.language` for syntax highlighting)
- `list(items): this` - Unified list (supports nesting, `list()` / `task()` in list)
- `task(items): this` - Shorthand for `list()` with all task items
- `pipe(arg): this` - Append an `MdNode` or apply a transform function
- `toNodes(): MdDoc` - Access the underlying AST
- `toString(): string` - Render to Markdown string

### Pipeline Functions

Each function returns an `MdNode`. Use with `pipe()` or as list items for nesting:

- `md()` - Create an empty document
- `h1(text)`, `h2(text)`, `h3(text)` - Headings
- `text(content)` - Plain text
- `link(text, url)` - Hyperlink
- `image(alt, url)` - Image
- `code(content, language?)` - Code block
- `list(items)` - Unified list
- `task(items)` - Shorthand for `list()` with all task items

### Utilities

- `pipe(initial, ...args)` - Build a document from `MdNode` values and transform functions
- `render(doc)` - Convert an `MdDoc` AST to a Markdown string

## Development

```bash
# Install dependencies
npm install

# Run tests
bun test

# Generate README.md from this example
bun run readme
```

### Roadmap

- [ ] Tables support
- [ ] Blockquotes support

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

[GitHub Repository](https://github.com/nikifutaki/ts-markdown)


