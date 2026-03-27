import type { MdNode, MdDoc, Nested, ListItem } from './types';
import { headingNode, textNode, linkNode, imageNode, codeNode, listNode } from './nodes';

export function md(): MdDoc {
  return [];
}

export function h1(text: string): MdNode {
  return headingNode(1, text);
}

export function h2(text: string): MdNode {
  return headingNode(2, text);
}

export function h3(text: string): MdNode {
  return headingNode(3, text);
}

export function text(content: string): MdNode {
  return textNode(content);
}

export function link(linkText: string, url: string): MdNode {
  return linkNode(linkText, url);
}

export function image(alt: string, url: string): MdNode {
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
