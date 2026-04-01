import type { MdDoc, MdNode, MdTransform, Nested, ListItem, InlineItem } from './types';
import { headingNode, textNode, linkNode, imageNode, codeNode, listNode } from './nodes';
import { render } from './render';

export class Markdown {
  private nodes: MdDoc = [];

  h1(...content: InlineItem[]): this {
    this.nodes.push(headingNode(1, ...content));
    return this;
  }

  h2(...content: InlineItem[]): this {
    this.nodes.push(headingNode(2, ...content));
    return this;
  }

  h3(...content: InlineItem[]): this {
    this.nodes.push(headingNode(3, ...content));
    return this;
  }

  text(...content: InlineItem[]): this {
    this.nodes.push(textNode(...content));
    return this;
  }

  link(text: string, url: string): this {
    this.nodes.push(linkNode(text, url));
    return this;
  }

  image(alt: string, url: string): this {
    this.nodes.push(imageNode(alt, url));
    return this;
  }

  code(code: Nested<string>, options?: { language?: string }): this {
    this.nodes.push(codeNode(code, options?.language));
    return this;
  }

  list(items: Nested<ListItem>[]): this {
    this.nodes.push(listNode(items));
    return this;
  }

  task(items: Nested<{ text: string; checked: boolean }>[]): this {
    this.nodes.push(listNode(items));
    return this;
  }

  pipe(arg: MdNode | MdTransform): this {
    if (typeof arg === 'function') {
      this.nodes = arg(this.nodes);
    } else {
      this.nodes.push(arg);
    }
    return this;
  }

  toNodes(): MdDoc {
    return [...this.nodes];
  }

  toString(): string {
    return render(this.nodes);
  }
}
