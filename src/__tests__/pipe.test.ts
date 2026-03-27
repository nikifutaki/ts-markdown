import { pipe } from '../pipe';
import { md, h1, text } from '../transforms';

describe('pipe', () => {
  it('returns initial doc when no args provided', () => {
    expect(pipe(md())).toEqual([]);
  });

  it('appends MdNode values', () => {
    const doc = pipe(md(), h1('Title'), text('Body'));
    expect(doc).toHaveLength(2);
    expect(doc[0]).toEqual({ type: 'heading', level: 1, text: 'Title' });
    expect(doc[1]).toEqual({ type: 'text', text: 'Body' });
  });

  it('applies transform functions', () => {
    const doc = pipe(
      md(),
      h1('Title'),
      (doc) => doc.filter((n) => n.type !== 'heading'),
    );
    expect(doc).toHaveLength(0);
  });

  it('mixes MdNode and transform functions', () => {
    const doc = pipe(
      md(),
      h1('Title'),
      (doc) => [...doc, { type: 'text' as const, text: 'injected' }],
      text('After'),
    );
    expect(doc).toHaveLength(3);
    expect(doc[1]).toEqual({ type: 'text', text: 'injected' });
    expect(doc[2]).toEqual({ type: 'text', text: 'After' });
  });
});
