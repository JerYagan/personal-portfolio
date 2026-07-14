import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

interface ButtonBaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'inline-flex items-center gap-2 rounded-[10px] bg-ink px-4 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5',
  secondary:
    'inline-flex items-center gap-2 rounded-[10px] border border-line px-4 py-3 text-sm font-medium transition-colors hover:bg-card',
};

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', children, className = '', ...rest }: ButtonProps) {
  return (
    <button className={`${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

type LinkButtonProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function LinkButton({ variant = 'primary', children, className = '', ...rest }: LinkButtonProps) {
  return (
    <a className={`${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
