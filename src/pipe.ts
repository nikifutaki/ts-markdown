import type { MdDoc, MdNode, MdTransform } from './types';

export function pipe(initial: MdDoc, ...args: (MdNode | MdTransform)[]): MdDoc {
  const doc = [...initial];
  return args.reduce<MdDoc>((acc, arg) => {
    if (typeof arg === 'function') return [...arg(acc)];
    acc.push(arg);
    return acc;
  }, doc);
}
