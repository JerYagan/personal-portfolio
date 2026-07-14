import { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 md:flex-row md:items-end">
      <div>
        <p className="font-mono text-[11px] tracking-[0.16em] text-brand">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
