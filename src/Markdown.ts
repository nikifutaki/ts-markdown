interface FormatOption {
  break?: boolean;
}

type Nested<T> = T | Nested<T>[];

export class Markdown {
  private content: string = '';

  private addBreak(options?: FormatOption): string {
    return !options?.break ? '\n\n' : '';
  }

  h1(text: string, options?: FormatOption): this {
    this.content += `# ${text}`;
    this.content += this.addBreak(options);
    return this;
  }

  h2(text: string, options?: FormatOption): this {
    this.content += `## ${text}`;
    this.content += this.addBreak(options);
    return this;
  }

  h3(text: string, options?: FormatOption): this {
    this.content += `### ${text}`;
    this.content += this.addBreak(options);
    return this;
  }

  text(text: string, options?: FormatOption): this {
    this.content += `${text}`;
    this.content += this.addBreak(options);
    return this;
  }

  link(text: string, url: string, options?: FormatOption): this {
    this.content += `[${text}](${url})`;
    this.content += this.addBreak(options);
    return this;
  }

  image(text: string, url: string, options?: FormatOption): this {
    this.content += `![${text}](${url})`;
    this.content += this.addBreak(options);
    return this;
  }

  code(code: Nested<string>, options?: FormatOption & { language?: string }): this {
    const processCode = (code: Nested<string>, level: number = 0): string => {
      if (typeof code === 'string') {
        return `${'  '.repeat(level)}${code}`;
      }
      return code.map(subItem => processCode(subItem, level + 1)).join('\n');
    };
    
    const processedCode = typeof code === 'string' ? code : code.map(c => processCode(c)).join('\n');
    this.content += `\`\`\`${options?.language}\n${processedCode}\n\`\`\`\n\n`;
    return this;
  }

  list(items: Nested<string>[], options?: FormatOption): this {
    const processItem = (item: Nested<string>, level: number = 0): string => {
      if (typeof item === 'string') {
        return `${'  '.repeat(level)}- ${item}`;
      }
      return item.map(subItem => processItem(subItem, level + 1)).join('\n');
    };

    this.content += items.map(item => processItem(item)).join('\n');
    this.content += `\n\n`;
    return this;
  }


  task(items: Nested<{ text: string, checked: boolean }>[], options?: FormatOption): this {
    const processItem = (item: Nested<{ text: string, checked: boolean }>, level: number = 0): string => {
      if (typeof item === 'object' && 'text' in item && 'checked' in item) {
        return `${'  '.repeat(level)}- [${item.checked ? 'x' : ' '}] ${item.text}`;
      }
      return item.map(subItem => processItem(subItem, level + 1)).join('\n');
    };

    this.content += items.map(item => processItem(item)).join('\n');
    this.content += `\n\n`;
    return this;
  }

  toString(): string {
    return this.content;
  }
} 