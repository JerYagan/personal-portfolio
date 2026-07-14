export interface parsedMarkdown<T = any> {
  data: T;
  content: string;
}

export function parseMarkdown<T = any>(rawText: string): parsedMarkdown<T> {
  const normalized = rawText.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return {
      data: {} as T,
      content: rawText,
    };
  }

  const frontmatterText = match[1];
  const content = match[2].trim();
  
  const data = parseYAML(frontmatterText);

  return { data: data as T, content };
}

function parseYAML(yamlText: string): any {
  const lines = yamlText.split('\n');
  const root: any = {};
  const stack: { indent: number; value: any; key?: string }[] = [{ indent: -1, value: root }];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Count leading spaces to determine indentation
    const indent = line.search(/\S/);

    // Pop from stack until we find the parent context
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const currentParent = stack[stack.length - 1];

    if (trimmed.startsWith('-')) {
      // It's a list item
      const itemContent = trimmed.substring(1).trim();
      
      // If parent is not an array, initialize it
      let parentValue = currentParent.value;
      if (currentParent.key) {
        if (!parentValue[currentParent.key] || !Array.isArray(parentValue[currentParent.key])) {
          parentValue[currentParent.key] = [];
        }
        parentValue = parentValue[currentParent.key];
      }

      if (itemContent.includes(':')) {
        // Object inside array: - key: value
        const colonIdx = itemContent.indexOf(':');
        const k = itemContent.substring(0, colonIdx).trim();
        const v = itemContent.substring(colonIdx + 1).trim();
        
        const obj: any = {};
        if (v !== '') {
          obj[k] = parseValue(v);
        }
        parentValue.push(obj);
        
        // Push this object to stack so subsequent indented keys are added to it
        stack.push({ indent: indent + 2, value: obj });
      } else {
        // Simple value: - value
        parentValue.push(parseValue(itemContent));
      }
    } else {
      // It's a key-value or key-object
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx === -1) continue;

      const key = trimmed.substring(0, colonIdx).trim();
      const value = trimmed.substring(colonIdx + 1).trim();

      let target = currentParent.value;
      if (currentParent.key && target[currentParent.key] !== undefined) {
        target = target[currentParent.key];
      }
      if (Array.isArray(target)) {
        // If target is an array, we must attach to the last object in the array
        const lastItem = target[target.length - 1];
        if (lastItem && typeof lastItem === 'object') {
          target = lastItem;
        } else {
          // Fallback
          const obj = {};
          target.push(obj);
          target = obj;
        }
      }

      if (value === '') {
        // Object or array value
        target[key] = {};
        stack.push({ indent, value: target, key });
      } else {
        target[key] = parseValue(value);
      }
    }
  }

  return root;
}

function parseValue(val: string): any {
  val = val.trim();
  // Remove surrounding quotes
  val = val.replace(/^["']|["']$/g, '');
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val.startsWith('[') && val.endsWith(']')) {
    return val.slice(1, -1).split(',').map(v => parseValue(v));
  }
  if (!isNaN(Number(val)) && val !== '') return Number(val);
  return val;
}


export function parseBodySections(content: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const normalized = content.replace(/\r\n/g, '\n');
  const regex = /^#\s+(.+)$/gm;
  
  let match;
  const headings: { title: string; index: number }[] = [];
  
  while ((match = regex.exec(normalized)) !== null) {
    headings.push({
      title: match[1].trim(),
      index: match.index,
    });
  }
  
  for (let i = 0; i < headings.length; i++) {
    const headingText = headings[i].title;
    const start = headings[i].index + headingText.length + 2; // account for # and space/newline
    const end = i < headings.length - 1 ? headings[i + 1].index : normalized.length;
    sections[headingText.toLowerCase()] = normalized.substring(start, end).trim();
  }
  
  return sections;
}

export function parseSubsections(content: string): Record<string, string> {
  const subsections: Record<string, string> = {};
  const normalized = content.replace(/\r\n/g, '\n');
  const regex = /^##\s+(.+)$/gm;
  
  let match;
  const headings: { title: string; index: number }[] = [];
  
  while ((match = regex.exec(normalized)) !== null) {
    headings.push({
      title: match[1].trim(),
      index: match.index,
    });
  }
  
  for (let i = 0; i < headings.length; i++) {
    const headingText = headings[i].title;
    const start = headings[i].index + headingText.length + 3; // account for ## and space/newline
    const end = i < headings.length - 1 ? headings[i + 1].index : normalized.length;
    subsections[headingText.toLowerCase()] = normalized.substring(start, end).trim();
  }
  
  return subsections;
}

