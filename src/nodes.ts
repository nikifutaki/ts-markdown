import type { MdNode, Nested, ListItem, InlineItem, LinkNode, ImageNode } from './types';

export function headingNode(level: 1 | 2 | 3, ...content: InlineItem[]): MdNode {
  return { type: 'heading', level, content };
}

export function textNode(...content: InlineItem[]): MdNode {
  return { type: 'text', content };
}

export function linkNode(text: string, url: string): LinkNode {
  return { type: 'link', text, url };
}

export function imageNode(alt: string, url: string): ImageNode {
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
