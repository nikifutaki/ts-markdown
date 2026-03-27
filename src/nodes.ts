import type { MdNode, Nested, ListItem } from './types';

export function headingNode(level: 1 | 2 | 3, text: string): MdNode {
  return { type: 'heading', level, text };
}

export function textNode(text: string): MdNode {
  return { type: 'text', text };
}

export function linkNode(text: string, url: string): MdNode {
  return { type: 'link', text, url };
}

export function imageNode(alt: string, url: string): MdNode {
  return { type: 'image', alt, url };
}

export function codeNode(code: Nested<string>, language?: string): MdNode {
  return language !== undefined
    ? { type: 'code', code, language }
    : { type: 'code', code };
}

export function listNode(items: Nested<ListItem>[]): MdNode {
  return { type: 'list', items };
}
