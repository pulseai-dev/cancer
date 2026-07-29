import type { ButtonHTMLAttributes, ReactNode } from 'react';

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary/90 active:scale-[0.96] shadow-sm hover:shadow-md',
  secondary: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/5 active:scale-[0.96]',
  danger: 'bg-danger text-white hover:bg-danger/90 active:scale-[0.96] shadow-sm hover:shadow-md',
  ghost: 'text-neutral bg-transparent hover:bg-black/5 active:scale-[0.96]',
  icon: 'bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 active:scale-[0.96] shadow-sm',
  link: 'text-primary underline-offset-2 hover:underline bg-transparent p-0 h-auto',
};

const sizeClasses = {
  xs: 'h-7 px-3 text-xs rounded-md',
  sm: 'h-9 px-4 text-sm rounded-lg',
  md: 'h-11 px-5 text-base rounded-lg',
  lg: 'h-[52px] px-6 text-lg rounded-lg',
};

const iconSizeClasses = {
  xs: 'w-7 h-7',
  sm: 'w-9 h-9',
  md: 'w-11 h-11',
  lg: 'w-[52px] h-[52px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  icon,
  fullWidth,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = variant === 'icon';

  return (
    <button
      className={`
        font-medium transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
        ${isIconOnly ? iconSizeClasses[size] : sizeClasses[size]}
        ${variantClasses[variant]}
        ${loading ? 'opacity-60 pointer-events-none' : ''}
        ${fullWidth && !isIconOnly ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Spinner />
          {children && <span className="opacity-60">{children}</span>}
        </span>
      ) : icon ? (
        <span className="flex items-center justify-center gap-2">
          {icon}
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
