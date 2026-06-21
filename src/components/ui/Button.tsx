import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'whatsapp' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-navy-900 text-white shadow-md shadow-navy-900/15 hover:bg-navy-800 active:bg-navy-950',
  secondary:
    'border-2 border-navy-900/15 bg-white text-navy-900 hover:border-teal-500/40 hover:bg-teal-500/5',
  whatsapp:
    'bg-[#25D366] text-white shadow-md shadow-[#25D366]/20 hover:bg-[#1fb855] active:bg-[#1a9e49]',
  ghost: 'text-navy-800 hover:bg-navy-900/5',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  to?: undefined;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
  to?: undefined;
}

interface ButtonAsRouterLink extends ButtonBaseProps {
  to: string;
  href?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsRouterLink;

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const external = 'external' in props && props.external;
    return (
      <a
        href={props.href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? 'button'} onClick={buttonProps.onClick} className={classes}>
      {children}
    </button>
  );
}
