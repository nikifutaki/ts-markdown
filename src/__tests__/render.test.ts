import { render } from '../render';
import type { MdDoc } from '../types';
import { list, task } from '../transforms';

describe('render', () => {
  it('returns empty string for empty doc', () => {
    expect(render([])).toBe('');
  });

  it('renders heading nodes', () => {
    expect(render([{ type: 'heading', level: 1, text: 'Title' }])).toBe('# Title\n\n');
    expect(render([{ type: 'heading', level: 2, text: 'Sub' }])).toBe('## Sub\n\n');
    expect(render([{ type: 'heading', level: 3, text: 'Sub2' }])).toBe('### Sub2\n\n');
  });

  it('renders text nodes', () => {
    expect(render([{ type: 'text', text: 'Hello world' }])).toBe('Hello world\n\n');
  });

  it('renders link nodes', () => {
    expect(render([{ type: 'link', text: 'Click', url: 'https://example.com' }]))
      .toBe('[Click](https://example.com)\n\n');
  });

  it('renders image nodes', () => {
    expect(render([{ type: 'image', alt: 'Logo', url: 'logo.png' }]))
      .toBe('![Logo](logo.png)\n\n');
  });

  it('renders code block with language', () => {
    expect(render([{ type: 'code', code: 'const x = 1;', language: 'typescript' }]))
      .toBe('```typescript\nconst x = 1;\n```\n\n');
  });

  it('renders code block without language', () => {
    expect(render([{ type: 'code', code: 'echo hi' }]))
      .toBe('```\necho hi\n```\n\n');
  });

  it('renders code block with nested arrays', () => {
    const doc: MdDoc = [{
      type: 'code',
      code: ['line1', ['nested1', 'nested2'], 'line2'],
      language: 'ts',
    }];
    expect(render(doc)).toBe('```ts\nline1\n  nested1\n  nested2\nline2\n```\n\n');
  });

  it('renders plain list', () => {
    expect(render([{ type: 'list', items: ['a', 'b', 'c'] }]))
      .toBe('- a\n- b\n- c\n\n');
  });

  it('renders nested list via arrays', () => {
    expect(render([{ type: 'list', items: ['top', ['nested1', 'nested2']] }]))
      .toBe('- top\n  - nested1\n  - nested2\n\n');
  });

  it('renders task items in list', () => {
    const doc: MdDoc = [{
      type: 'list',
      items: [
        { text: 'Done', checked: true },
        { text: 'Todo', checked: false },
      ],
    }];
    expect(render(doc)).toBe('- [x] Done\n- [ ] Todo\n\n');
  });

  it('renders mixed plain and task items', () => {
    const doc: MdDoc = [{
      type: 'list',
      items: [
        'Regular',
        { text: 'Task done', checked: true },
        { text: 'Task todo', checked: false },
      ],
    }];
    expect(render(doc)).toBe('- Regular\n- [x] Task done\n- [ ] Task todo\n\n');
  });

  it('renders list in list', () => {
    const doc: MdDoc = [{
      type: 'list',
      items: [
        'Top',
        list(['nested1', 'nested2']),
      ],
    }];
    expect(render(doc)).toBe('- Top\n  - nested1\n  - nested2\n\n');
  });

  it('renders task in list', () => {
    const doc: MdDoc = [{
      type: 'list',
      items: [
        'Regular',
        task([
          { text: 'Done', checked: true },
          { text: 'Todo', checked: false },
        ]),
      ],
    }];
    expect(render(doc)).toBe('- Regular\n  - [x] Done\n  - [ ] Todo\n\n');
  });

  it('renders list in task', () => {
    const doc: MdDoc = [{
      type: 'list',
      items: [
        { text: 'Parent', checked: true },
        list(['child1', 'child2']),
      ],
    }];
    expect(render(doc)).toBe('- [x] Parent\n  - child1\n  - child2\n\n');
  });

  it('renders deeply nested lists', () => {
    const doc: MdDoc = [{
      type: 'list',
      items: [
        'Level 0',
        list([
          'Level 1',
          list(['Level 2']),
        ]),
      ],
    }];
    expect(render(doc)).toBe('- Level 0\n  - Level 1\n    - Level 2\n\n');
  });

  it('separates multiple nodes with double newline', () => {
    const doc: MdDoc = [
      { type: 'heading', level: 1, text: 'Title' },
      { type: 'text', text: 'Body' },
    ];
    expect(render(doc)).toBe('# Title\n\nBody\n\n');
  });

  it('renders non-list MdNode inside a list with - prefix', () => {
    const doc: MdDoc = [{
      type: 'list',
      items: [
        'Plain item',
        { type: 'text', text: 'Inline text node' },
        { type: 'link', text: 'Example', url: 'https://example.com' },
      ],
    }];
    expect(render(doc)).toBe('- Plain item\n- Inline text node\n- [Example](https://example.com)\n\n');
  });
});
