# ts-markdown

A TypeScript library for generating Markdown content programmatically.

## Features

Fluent interface for building Markdown documents

Support for common Markdown elements:

- Headings (h1, h2, h3)
- Text
- Links
- Images
- Code blocks with syntax highlighting
- Lists

Development roadmap:

- [x] Add support for task lists
- [ ] Add support for tables
- [ ] Add support for blockquotes
- [ ] Add support for task lists
- [ ] Add support for nested task lists
- [ ] Add support for custom formatting options

## Installation

```bash
npm install ts-markdown
```

## Usage

```typescript
import { Markdown } from 'ts-markdown';

const md = new Markdown();

md.h1('Welcome to My Document')
.text('This is a sample document created with ts-markdown.')
.h2('Features')
.list([
  'Easy to use',
  'TypeScript support',
  'Fluent interface'
])
.h2('Code Example')
.code(
  'const greeting = "Hello, World!";',
  { language: 'typescript' }
)
.link('GitHub Repository', 'https://github.com/nikifutaki/ts-markdown')

console.log(md.toString());
```

## API Reference

### Methods

- Headings
  - `h1(text: string): this` - Add a level 1 heading
  - `h2(text: string): this` - Add a level 2 heading
  - `h3(text: string): this` - Add a level 3 heading
- `text(text: string): this` - Add plain text
- `link(text: string, url: string): this` - Add a link
- `image(text: string, url: string): this` - Add an image
- `code(language: string, code: string): this` - Add a code block with syntax highlighting
- `list(items: string[]): this` - Add a bullet point list
- `toString(): string` - Get the generated Markdown content

## Development

```bash
# Install dependencies
npm install

# Generate README.md
npm run readme
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


