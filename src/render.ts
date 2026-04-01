import type { MdNode, MdDoc, Nested, ListItem, InlineContent } from './types';

export function render(doc: MdDoc): string {
  if (doc.length === 0) return '';
  return doc.map(renderNode).join('\n\n') + '\n\n';
}

function renderInline(content: InlineContent): string {
  return content.map((item) => {
    if (typeof item === 'string') return item;
    if (item.type === 'link') return `[${item.text}](${item.url})`;
    if (item.type === 'image') return `![${item.alt}](${item.url})`;
    return '';
  }).join('');
}

function renderNode(node: MdNode): string {
  switch (node.type) {
    case 'heading':
      return `${'#'.repeat(node.level)} ${renderInline(node.content)}`;
    case 'text':
      return renderInline(node.content);
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
  // MdNode check must come before task item check because task items
  // ({ text, checked }) lack a 'type' property, while all MdNode variants
  // have one. If we checked 'text' + 'checked' first, an MdNode that
  // happened to have those fields would be misclassified as a task item.
  if ('type' in item) {
    if (item.type === 'list') {
      return item.items.map((sub) => renderListItem(sub, level + 1)).join('\n');
    }
    const indent = '  '.repeat(level);
    const rendered = renderNode(item);
    const lines = rendered.split('\n');
    const indented = [
      `${indent}- ${lines[0]}`,
      ...lines.slice(1).map((line) => `${indent}  ${line}`),
    ].join('\n');
    return indented;
  }
  // Task item: { text, checked }
  if ('text' in item && 'checked' in item) {
    const checkbox = item.checked ? '[x]' : '[ ]';
    return `${'  '.repeat(level)}- ${checkbox} ${item.text}`;
  }
  throw new Error(`renderListItem: unrecognized item shape: ${JSON.stringify(item)}`);
}
