import { Link } from 'react-router-dom';
import {
  parseInlineMarkdown,
  parseMarkdownBlocks,
  type InlineSegment,
} from '../lib/markdown';

interface MarkdownContentProps {
  markdown: string;
  className?: string;
}

function InlineContent({ text }: { text: string }) {
  const segments = parseInlineMarkdown(text);

  return (
    <>
      {segments.map((seg, i) => (
        <InlineSegment key={i} segment={seg} />
      ))}
    </>
  );
}

function InlineSegment({ segment }: { segment: InlineSegment }) {
  if (segment.type === 'bold') {
    return <strong>{segment.content}</strong>;
  }

  if (segment.type === 'link' && segment.href) {
    if (segment.external) {
      return (
        <a href={segment.href} target="_blank" rel="noreferrer noopener">
          {segment.content}
        </a>
      );
    }

    return <Link to={segment.href}>{segment.content}</Link>;
  }

  return <>{segment.content}</>;
}

export function MarkdownContent({ markdown, className = '' }: MarkdownContentProps) {
  const blocks = parseMarkdownBlocks(markdown);

  return (
    <div className={`prose-article max-w-none ${className}`}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} id={block.id}>
                <InlineContent text={block.text} />
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} id={block.id}>
                <InlineContent text={block.text} />
              </h3>
            );
          case 'blockquote':
            return (
              <blockquote key={i} className="article-callout">
                <InlineContent text={block.text} />
              </blockquote>
            );
          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <InlineContent text={item} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <InlineContent text={item} />
                  </li>
                ))}
              </ol>
            );
          case 'table':
            return (
              <div key={i} className="article-table-wrap">
                <table>
                  <thead>
                    <tr>
                      {block.headers.map((h, j) => (
                        <th key={j}>
                          <InlineContent text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci}>
                            <InlineContent text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'p':
            return (
              <p key={i}>
                <InlineContent text={block.text} />
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
