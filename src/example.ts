import { Markdown } from './Markdown';

export const md = new Markdown()
  .h1('ts-markdown')
  .text('A TypeScript library for generating Markdown content programmatically.')
  .h2('Features')
  .text('Fluent interface for building Markdown documents')
  .text('Support for common Markdown elements:')
  .list([
    'Headings (h1, h2, h3)',
    'Text',
    'Links',
    'Images',
    'Code blocks with syntax highlighting',
    'Lists'
  ])
  .text('Development roadmap:')
  .task([
    { text: 'Add support for task lists', checked: true },
    { text: 'Add support for tables', checked: false },
    { text: 'Add support for blockquotes', checked: false },
    { text: 'Add support for task lists', checked: false },
    { text: 'Add support for nested task lists', checked: false },
    { text: 'Add support for custom formatting options', checked: false }
  ])
  .h2('Installation')
  .code('npm install ts-markdown', { language: 'bash' })
  .h2('Usage')
  .code([
    'import { Markdown } from \'ts-markdown\';',
    '',
    'const md = new Markdown();',
    '',
    'md.h1(\'Welcome to My Document\')',
    '.text(\'This is a sample document created with ts-markdown.\')',
    '.h2(\'Features\')',
    '.list([',
      ['\'Easy to use\',',
      '\'TypeScript support\',',
      '\'Fluent interface\''],
    '])',
    '.h2(\'Code Example\')',
    '.code(',
    [
      '\'const greeting = "Hello, World!";\',',
      '{ language: \'typescript\' }',
    ],
    ')',
    '.link(\'GitHub Repository\', \'https://github.com/nikifutaki/ts-markdown\')',
    '',
    'console.log(md.toString());']
  , { language: 'typescript' })
  .h2('API Reference')
  .h3('Methods')
  .list([
    'Headings',
    [
      '`h1(text: string): this` - Add a level 1 heading',
      '`h2(text: string): this` - Add a level 2 heading',
      '`h3(text: string): this` - Add a level 3 heading',
    ],
    '`text(text: string): this` - Add plain text',
    '`link(text: string, url: string): this` - Add a link',
    '`image(text: string, url: string): this` - Add an image',
    '`code(language: string, code: string): this` - Add a code block with syntax highlighting',
    '`list(items: string[]): this` - Add a bullet point list',
    '`toString(): string` - Get the generated Markdown content'
  ])
  .h2('Development')
  .code([
    '# Install dependencies',
    'npm install',
    '',
    '# Generate README.md',
    'npm run readme',
  ], { language: 'bash' })
  .h2('License')
  .text('This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.');

console.log(md.toString()); 