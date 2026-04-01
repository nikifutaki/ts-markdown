import { pipe } from '../pipe';
import { md, h1, text } from '../transforms';

describe('pipe', () => {
  it('returns initial doc when no args provided', () => {
    expect(pipe(md())).toEqual([]);
  });

  it('appends MdNode values', () => {
    const doc = pipe(md(), h1('Title'), text('Body'));
    expect(doc).toHaveLength(2);
    expect(doc[0]).toEqual({ type: 'heading', level: 1, content: ['Title'] });
    expect(doc[1]).toEqual({ type: 'text', content: ['Body'] });
  });

  it('applies transform functions', () => {
    const doc = pipe(
      md(),
      h1('Title'),
      (doc) => doc.filter((n) => n.type !== 'heading'),
    );
    expect(doc).toHaveLength(0);
  });

  it('does not mutate arrays returned by transforms', () => {
    const shared = [{ type: 'heading' as const, level: 1 as const, content: ['Title'] }];
    const inject = () => shared;
    const doc1 = pipe(md(), inject, text('A'));
    const doc2 = pipe(md(), inject, text('B'));
    expect(shared).toHaveLength(1); // shared was not mutated
    expect(doc1).toHaveLength(2);
    expect(doc2).toHaveLength(2);
  });

  it('mixes MdNode and transform functions', () => {
    const doc = pipe(
      md(),
      h1('Title'),
      (doc) => [...doc, { type: 'text' as const, content: ['injected'] }],
      text('After'),
    );
    expect(doc).toHaveLength(3);
    expect(doc[1]).toEqual({ type: 'text', content: ['injected'] });
    expect(doc[2]).toEqual({ type: 'text', content: ['After'] });
  });
});
