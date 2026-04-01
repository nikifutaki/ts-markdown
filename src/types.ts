export type Nested<T> = T | Nested<T>[];

export type MdNode =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'text'; text: string }
  | { type: 'link'; text: string; url: string }
  | { type: 'image'; alt: string; url: string }
  | { type: 'code'; code: Nested<string>; language?: string }
  | { type: 'list'; items: Nested<ListItem>[] };

export type ListItem = string | { text: string; checked: boolean } | MdNode;

export type MdDoc = MdNode[];

export type MdTransform = (doc: MdDoc) => MdDoc;
