interface MarkdownContentProps {
  markdown: string;
  className?: string;
}

export function MarkdownContent({ markdown, className = '' }: MarkdownContentProps) {
  const blocks = markdown.split(/\n\n+/);

  return (
    <div className={`prose-article max-w-none ${className}`}>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i}>
              {trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '')}
            </h2>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={i}>
              {trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '')}
            </h3>
          );
        }
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter((l) => l.startsWith('- '));
          return (
            <ul key={i}>
              {items.map((item, j) => (
                <li key={j}>{item.replace(/^-\s+/, '').replace(/\*\*/g, '')}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="whitespace-pre-wrap">
            {trimmed.replace(/\*\*(.*?)\*\*/g, '$1')}
          </p>
        );
      })}
    </div>
  );
}
