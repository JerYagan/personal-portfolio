import { getTechIcon } from '../utils/iconLoader';

interface TagProps {
  children: string;
  className?: string;
}

export function Tag({ children, className = '' }: TagProps) {
  const icon = getTechIcon(children);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 font-mono text-xs text-zinc-300 [&>svg]:size-3.5 ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
