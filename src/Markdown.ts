import type { MdDoc, MdNode, MdTransform, Nested, ListItem } from './types';
import { headingNode, textNode, linkNode, imageNode, codeNode, listNode } from './nodes';
import { render } from './render';

export class Markdown {
  private nodes: MdDoc = [];

  h1(text: string): this {
    this.nodes.push(headingNode(1, text));
    return this;
  }

  h2(text: string): this {
    this.nodes.push(headingNode(2, text));
    return this;
  }

  h3(text: string): this {
    this.nodes.push(headingNode(3, text));
    return this;
  }

  text(text: string): this {
    this.nodes.push(textNode(text));
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
