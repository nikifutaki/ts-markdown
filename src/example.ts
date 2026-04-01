import { Markdown } from './Markdown';
import { pipe, md, h1, h2, h3, text, link, image, list, task, code, render } from './index';

// =============================================================
// Pipeline パターンでヘッダーを構築
// h1(), text(), image() を実際に使用
// =============================================================
const header = pipe(
  md(),
  h1('ts-markdown'),
  text('A TypeScript library for generating ', link('Markdown', 'https://commonmark.org'), ' content programmatically.'),
  image('License: MIT', 'https://img.shields.io/badge/license-MIT-blue.svg'),
);

// =============================================================
// Pipeline パターンで API Reference セクションを構築
// pipe(), md(), h3(), text(), list() を実際に使用
// =============================================================
const apiReference = pipe(
  md(),
  h3('Builder Class'),
  text('All methods return `this` for chaining:'),
  list([
    'Headings',
    [
      '`h1(text): this`',
      '`h2(text): this`',
      '`h3(text): this`',
    ],
    '`text(text): this` - Plain text',
    '`link(text, url): this` - Hyperlink',
    '`image(alt, url): this` - Image',
    '`code(code, options?): this` - Code block (`options.language` for syntax highlighting)',
    '`list(items): this` - Unified list (supports nesting, `list()` / `task()` in list)',
    '`task(items): this` - Shorthand for `list()` with all task items',
    '`pipe(arg): this` - Append an `MdNode` or apply a transform function',
    '`toNodes(): MdDoc` - Access the underlying AST',
    '`toString(): string` - Render to Markdown string',
  ]),
  h3('Pipeline Functions'),
  text('Each function returns an `MdNode`. Use with `pipe()` or as list items for nesting:'),
  list([
    '`md()` - Create an empty document',
    '`h1(text)`, `h2(text)`, `h3(text)` - Headings',
    '`text(content)` - Plain text',
    '`link(text, url)` - Hyperlink',
    '`image(alt, url)` - Image',
    '`code(content, language?)` - Code block',
    '`list(items)` - Unified list',
    '`task(items)` - Shorthand for `list()` with all task items',
  ]),
  h3('Utilities'),
  list([
    '`pipe(initial, ...args)` - Build a document from `MdNode` values and transform functions',
    '`render(doc)` - Convert an `MdDoc` AST to a Markdown string',
  ]),
);

// =============================================================
// Builder パターンをメインに構築
// .pipe() で Pipeline の結果や transform 関数を組み込む
// =============================================================
export const doc = new Markdown()
  .pipe((nodes) => [...nodes, ...header])
  .h2('Features')
  .list([
    'Two styles: **Fluent Builder** and **Pipeline**',
    'AST-based internals for structured document manipulation',
    'Composable lists — nest `list()` / `task()` freely:',
    [
      'Headings (h1, h2, h3)',
      'Text, Links & Images',
      'Code blocks with syntax highlighting',
      { text: 'Composable & nestable lists', checked: true },
      { text: 'Tables', checked: false },
      { text: 'Blockquotes', checked: false },
    ],
  ])
  .h2('Installation')
  .code('npm install ts-markdown', { language: 'bash' })
  .h2('Usage')
  .h3('Builder Pattern')
  .text('Use the `Markdown` class for a fluent, chainable API:')
  .code([
    "import { Markdown } from 'ts-markdown';",
    '',
    'const doc = new Markdown()',
    [
      ".h1('My Document')",
      ".text('Hello, world!')",
      ".list(['Item 1', 'Item 2'])",
      ".code('console.log(42);', { language: 'typescript' })",
      '.toString();',
    ],
  ], { language: 'typescript' })
  .h3('Pipeline Pattern')
  .text('Use `pipe()` with standalone functions for a functional style:')
  .code([
    "import { pipe, md, h1, text, list, code, render } from 'ts-markdown';",
    '',
    'const doc = pipe(',
    [
      'md(),',
      "h1('My Document'),",
      "text('Hello, world!'),",
      "list(['Item 1', 'Item 2']),",
      "code('console.log(42);', 'typescript'),",
    ],
    ');',
    '',
    'console.log(render(doc));',
  ], { language: 'typescript' })
  .h3('Composable Lists')
  .text('Nest `list()` and `task()` inside each other freely:')
  .code([
    "import { list, task } from 'ts-markdown';",
    '',
    'list([',
    [
      "'Regular item',",
      "list(['Sub-item A', 'Sub-item B']),",
      "task([",
      [
        "{ text: 'Done', checked: true },",
        "{ text: 'Todo', checked: false },",
      ],
      "]),",
    ],
    '])',
  ], { language: 'typescript' })
  .text('Output:')
  .list([
    'Regular item',
    list(['Sub-item A', 'Sub-item B']),
    task([
      { text: 'Done', checked: true },
      { text: 'Todo', checked: false },
    ]),
  ])
  .h3('Mixing Both Styles')
  .text("The Builder's `.pipe()` accepts both `MdNode` values and transform functions:")
  .code([
    "import { Markdown, list } from 'ts-markdown';",
    '',
    'const doc = new Markdown()',
    [
      ".h1('Project')",
      ".pipe(list(['Feature A', 'Feature B']))",
      '.toString();',
    ],
  ], { language: 'typescript' })
  // API Reference セクションを Pipeline で構築した結果を .pipe() で注入
  .h2('API Reference')
  .pipe((nodes) => [...nodes, ...apiReference])
  // Development セクションは .pipe() + MdNode で追加
  .pipe(h2('Development'))
  .pipe(code([
    '# Install dependencies',
    'npm install',
    '',
    '# Run tests',
    'bun test',
    '',
    '# Generate README.md from this example',
    'bun run readme',
  ], 'bash'))
  .h3('Roadmap')
  .task([
    { text: 'Tables support', checked: false },
    { text: 'Blockquotes support', checked: false },
  ])
  .h2('License')
  .text('This project is licensed under the MIT License - see the ', link('LICENSE', './LICENSE'), ' file for details.')
  .link('GitHub Repository', 'https://github.com/nikifutaki/ts-markdown');

console.log(render(doc.toNodes()));
