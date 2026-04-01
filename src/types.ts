export type Nested<T> = T | Nested<T>[];

export type LinkNode = { type: 'link'; text: string; url: string };
export type ImageNode = { type: 'image'; alt: string; url: string };
export type InlineNode = LinkNode | ImageNode;
export type InlineItem = string | InlineNode;
export type InlineContent = InlineItem[];

export type MdNode =
  | { type: 'heading'; level: 1 | 2 | 3; content: InlineContent }
  | { type: 'text'; content: InlineContent }
  | LinkNode
  | ImageNode
  | { type: 'code'; code: Nested<string>; language?: string }
  | { type: 'list'; items: Nested<ListItem>[] };

export type ListItem = string | { text: string; checked: boolean } | MdNode;

export type MdDoc = MdNode[];

export type MdTransform = (doc: MdDoc) => MdDoc;
