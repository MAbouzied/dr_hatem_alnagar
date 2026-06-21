export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export type MarkdownBlock =
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'blockquote'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

let headingCounter = 0;

function nextHeadingId(): string {
  headingCounter += 1;
  return `section-${headingCounter}`;
}

function stripInlineMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\[(.*?)\]\(.*?\)/g, '$1');
}

function isTableBlock(block: string): boolean {
  const lines = block.split('\n').filter(Boolean);
  return lines.length >= 2 && lines.every((l) => l.trim().startsWith('|')) && /^\|[\s\-:|]+\|$/.test(lines[1].trim());
}

function parseTable(block: string): { headers: string[]; rows: string[][] } {
  const lines = block.split('\n').filter(Boolean);
  const parseRow = (line: string) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());

  const headers = parseRow(lines[0]);
  const rows = lines.slice(2).map(parseRow);
  return { headers, rows };
}

export function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  headingCounter = 0;
  const blocks: MarkdownBlock[] = [];
  const rawBlocks = markdown.split(/\n\n+/);

  for (const raw of rawBlocks) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^##\s+/, '');
      blocks.push({ type: 'h2', text, id: nextHeadingId() });
      continue;
    }

    if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^###\s+/, '');
      blocks.push({ type: 'h3', text, id: nextHeadingId() });
      continue;
    }

    if (trimmed.startsWith('>')) {
      const text = trimmed
        .split('\n')
        .map((l) => l.replace(/^>\s?/, ''))
        .join('\n');
      blocks.push({ type: 'blockquote', text });
      continue;
    }

    if (isTableBlock(trimmed)) {
      const { headers, rows } = parseTable(trimmed);
      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    const lines = trimmed.split('\n');
    if (lines.every((l) => l.startsWith('- '))) {
      blocks.push({
        type: 'ul',
        items: lines.map((l) => l.replace(/^-\s+/, '')),
      });
      continue;
    }

    if (lines.every((l) => /^\d+\.\s/.test(l))) {
      blocks.push({
        type: 'ol',
        items: lines.map((l) => l.replace(/^\d+\.\s+/, '')),
      });
      continue;
    }

    blocks.push({ type: 'p', text: trimmed });
  }

  return blocks;
}

export function extractToc(markdown: string): TocEntry[] {
  return parseMarkdownBlocks(markdown)
    .filter((b): b is Extract<MarkdownBlock, { type: 'h2' | 'h3' }> => b.type === 'h2' || b.type === 'h3')
    .map((b) => ({
      id: b.id,
      text: stripInlineMarkdown(b.text),
      level: b.type === 'h2' ? 2 : 3,
    }));
}

export interface InlineSegment {
  type: 'text' | 'bold' | 'link';
  content: string;
  href?: string;
  external?: boolean;
}

export function parseInlineMarkdown(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const pattern = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }

    const token = match[0];
    if (token.startsWith('**')) {
      segments.push({ type: 'bold', content: token.slice(2, -2) });
    } else {
      const linkMatch = /^\[(.*?)\]\((.*?)\)$/.exec(token);
      if (linkMatch) {
        const href = linkMatch[2];
        segments.push({
          type: 'link',
          content: linkMatch[1],
          href,
          external: /^https?:\/\//.test(href),
        });
      } else {
        segments.push({ type: 'text', content: token });
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return segments.length ? segments : [{ type: 'text', content: text }];
}
