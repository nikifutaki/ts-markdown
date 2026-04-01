import type { MdNode, MdDoc, Nested, ListItem, InlineItem, LinkNode, ImageNode } from './types';
import { headingNode, textNode, linkNode, imageNode, codeNode, listNode } from './nodes';

export function md(): MdDoc {
  return [];
}

export function h1(...content: InlineItem[]): MdNode {
  return headingNode(1, ...content);
}

export function h2(...content: InlineItem[]): MdNode {
  return headingNode(2, ...content);
}

export function h3(...content: InlineItem[]): MdNode {
  return headingNode(3, ...content);
}

export function text(...content: InlineItem[]): MdNode {
  return textNode(...content);
}

export function link(linkText: string, url: string): LinkNode {
  return linkNode(linkText, url);
}

export function image(alt: string, url: string): ImageNode {
  return imageNode(alt, url);
}

export function code(content: Nested<string>, language?: string): MdNode {
  return codeNode(content, language);
}

export function list(items: Nested<ListItem>[]): MdNode {
  return listNode(items);
}

export function task(items: Nested<{ text: string; checked: boolean }>[]): MdNode {
  return listNode(items);
}
