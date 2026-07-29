interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <div
      className={`${sizes[size]} border-2 border-white/30 border-t-white rounded-full animate-spin`}
    />
  );
}
