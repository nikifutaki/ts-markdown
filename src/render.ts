import type { MdNode, MdDoc, Nested, ListItem } from './types';

export function render(doc: MdDoc): string {
  if (doc.length === 0) return '';
  return doc.map(renderNode).join('\n\n') + '\n\n';
}

function renderNode(node: MdNode): string {
  switch (node.type) {
    case 'heading':
      return `${'#'.repeat(node.level)} ${node.text}`;
    case 'text':
      return node.text;
    case 'link':
      return `[${node.text}](${node.url})`;
    case 'image':
      return `![${node.alt}](${node.url})`;
    case 'code':
      return renderCode(node.code, node.language);
    case 'list':
      return renderList(node.items);
  }
}

function renderCode(code: Nested<string>, language?: string): string {
  const lang = language ?? '';
  const body = typeof code === 'string'
    ? code
    : code.map((c) => renderNestedCode(c, 0)).join('\n');
  return `\`\`\`${lang}\n${body}\n\`\`\``;
}

function renderNestedCode(code: Nested<string>, level: number): string {
  if (typeof code === 'string') {
    return `${'  '.repeat(level)}${code}`;
  }
  return code.map((item) => renderNestedCode(item, level + 1)).join('\n');
}

function renderList(items: Nested<ListItem>[]): string {
  return items.map((item) => renderListItem(item, 0)).join('\n');
}

function renderListItem(item: Nested<ListItem>, level: number): string {
  if (typeof item === 'string') {
    return `${'  '.repeat(level)}- ${item}`;
  }
  if (Array.isArray(item)) {
    return item.map((sub) => renderListItem(sub, level + 1)).join('\n');
  }
  // MdNode (has 'type' property)
  if ('type' in item) {
    if (item.type === 'list') {
      return item.items.map((sub) => renderListItem(sub, level + 1)).join('\n');
    }
    return `${'  '.repeat(level)}${renderNode(item)}`;
  }
  // Task item: { text, checked? }
  const prefix = item.checked !== undefined
    ? `[${item.checked ? 'x' : ' '}] `
    : '';
  return `${'  '.repeat(level)}- ${prefix}${item.text}`;
}
