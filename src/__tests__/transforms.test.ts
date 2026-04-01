import { pipe } from '../pipe';
import { md, h1, h2, h3, text, link, image, code, list, task } from '../transforms';
import { render } from '../render';

describe('transforms', () => {
  it('md() creates empty doc', () => {
    expect(md()).toEqual([]);
  });

  it('h1 returns heading node', () => {
    expect(h1('Title')).toEqual({ type: 'heading', level: 1, content: ['Title'] });
  });

  it('pipe composes nodes into a document', () => {
    const doc = pipe(
      md(),
      h1('Title'),
      text('Body'),
      list(['a', 'b']),
    );
    expect(doc).toHaveLength(3);
    expect(doc[0]).toEqual({ type: 'heading', level: 1, content: ['Title'] });
    expect(doc[1]).toEqual({ type: 'text', content: ['Body'] });
    expect(doc[2]).toEqual({ type: 'list', items: ['a', 'b'] });
  });

  it('pipe accepts transform functions', () => {
    const doc = pipe(
      md(),
      h1('Title'),
      (doc) => [...doc, { type: 'text' as const, content: ['injected'] }],
    );
    expect(doc).toHaveLength(2);
    expect(doc[1]).toEqual({ type: 'text', content: ['injected'] });
  });

  it('full pipeline renders to markdown', () => {
    const output = render(pipe(
      md(),
      h1('Hello'),
      text('World'),
    ));
    expect(output).toBe('# Hello\n\nWorld\n\n');
  });

  it('all functions return MdNode', () => {
    const doc = pipe(
      md(),
      h1('H1'),
      h2('H2'),
      h3('H3'),
      text('Text'),
      link('Link', 'https://example.com'),
      image('Alt', 'img.png'),
      code('const x = 1;', 'ts'),
      list(['a']),
      task([{ text: 'Todo', checked: false }]),
    );
    expect(doc).toHaveLength(9);
  });

  it('list() and task() can be nested as list items', () => {
    const node = list([
      'Regular',
      list(['sub1', 'sub2']),
      task([{ text: 'T', checked: true }]),
    ]);
    const output = render([node]);
    expect(output).toContain('- Regular');
    expect(output).toContain('  - sub1');
    expect(output).toContain('  - [x] T');
  });

  it('h1 accepts inline content with links', () => {
    const doc = pipe(
      md(),
      h1('Welcome to ', link('ts-markdown', 'https://github.com'), '!'),
    );
    const output = render(doc);
    expect(output).toBe('# Welcome to [ts-markdown](https://github.com)!\n\n');
  });

  it('text accepts inline content with images', () => {
    const doc = pipe(
      md(),
      text('Check ', image('logo', 'logo.png'), ' here'),
    );
    const output = render(doc);
    expect(output).toBe('Check ![logo](logo.png) here\n\n');
  });

  it('link returns LinkNode', () => {
    const node = link('Click', 'https://example.com');
    expect(node).toEqual({ type: 'link', text: 'Click', url: 'https://example.com' });
  });

  it('image returns ImageNode', () => {
    const node = image('Alt', 'img.png');
    expect(node).toEqual({ type: 'image', alt: 'Alt', url: 'img.png' });
  });
});
