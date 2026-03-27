import { pipe } from '../pipe';
import { md, h1, h2, h3, text, link, image, code, list, task } from '../transforms';
import { render } from '../render';

describe('transforms', () => {
  it('md() creates empty doc', () => {
    expect(md()).toEqual([]);
  });

  it('h1 returns heading node', () => {
    expect(h1('Title')).toEqual({ type: 'heading', level: 1, text: 'Title' });
  });

  it('pipe composes nodes into a document', () => {
    const doc = pipe(
      md(),
      h1('Title'),
      text('Body'),
      list(['a', 'b']),
    );
    expect(doc).toHaveLength(3);
    expect(doc[0]).toEqual({ type: 'heading', level: 1, text: 'Title' });
    expect(doc[1]).toEqual({ type: 'text', text: 'Body' });
    expect(doc[2]).toEqual({ type: 'list', items: ['a', 'b'] });
  });

  it('pipe accepts transform functions', () => {
    const doc = pipe(
      md(),
      h1('Title'),
      (doc) => [...doc, { type: 'text' as const, text: 'injected' }],
    );
    expect(doc).toHaveLength(2);
    expect(doc[1]).toEqual({ type: 'text', text: 'injected' });
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
});
