import type { MdDoc, MdNode, MdTransform } from './types';

export function pipe(initial: MdDoc, ...args: (MdNode | MdTransform)[]): MdDoc {
  return args.reduce<MdDoc>((doc, arg) => {
    return typeof arg === 'function' ? arg(doc) : [...doc, arg];
  }, initial);
}
