import { Markdown } from '../Markdown';
import { list, task } from '../transforms';

describe('Markdown', () => {
  it('builds markdown with fluent API', () => {
    const output = new Markdown()
      .h1('Title')
      .text('Hello')
      .toString();
    expect(output).toBe('# Title\n\nHello\n\n');
  });

  it('supports all methods', () => {
    const output = new Markdown()
      .h1('H1')
      .h2('H2')
      .h3('H3')
      .text('Text')
      .link('Link', 'https://example.com')
      .image('Alt', 'img.png')
      .code('x = 1', { language: 'py' })
      .list(['a', 'b'])
      .task([{ text: 'Todo', checked: false }])
      .toString();

    expect(output).toContain('# H1');
    expect(output).toContain('## H2');
    expect(output).toContain('### H3');
    expect(output).toContain('Text');
    expect(output).toContain('[Link](https://example.com)');
    expect(output).toContain('![Alt](img.png)');
    expect(output).toContain('```py\nx = 1\n```');
    expect(output).toContain('- a\n- b');
    expect(output).toContain('- [ ] Todo');
  });

  it('pipe() appends MdNode', () => {
    const output = new Markdown()
      .h1('Title')
      .pipe(list(['a', 'b']))
      .toString();
    expect(output).toContain('# Title');
    expect(output).toContain('- a\n- b');
  });

  it('pipe() applies transform function', () => {
    const output = new Markdown()
      .h1('Title')
      .pipe((doc) => [...doc, { type: 'text' as const, text: 'injected' }])
      .toString();
    expect(output).toContain('# Title');
    expect(output).toContain('injected');
  });

  it('list supports nested list() and task()', () => {
    const output = new Markdown()
      .list([
        'Regular',
        list(['sub1', 'sub2']),
        task([{ text: 'T', checked: true }]),
      ])
      .toString();
    expect(output).toContain('- Regular');
    expect(output).toContain('  - sub1');
    expect(output).toContain('  - sub2');
    expect(output).toContain('  - [x] T');
  });

  it('toNodes() returns a copy of the AST', () => {
    const md = new Markdown().h1('Title');
    const nodes = md.toNodes();
    expect(nodes).toHaveLength(1);
    expect(nodes[0]).toEqual({ type: 'heading', level: 1, text: 'Title' });

    nodes.push({ type: 'text', text: 'extra' });
    expect(md.toNodes()).toHaveLength(1);
  });

  it('code without language does not produce undefined', () => {
    const output = new Markdown().code('echo hi').toString();
    expect(output).toContain('```\necho hi\n```');
    expect(output).not.toContain('undefined');
  });
});
