// Simple variant utilities without external dependencies

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonVariants {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const buttonVariants = (props: ButtonVariants = {}): string => {
  const { variant = 'default', size = 'default' } = props;
  
  const baseClasses = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variantClasses: Record<ButtonVariant, string> = {
    default: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md',
    destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
    link: 'text-primary-600 underline-offset-4 hover:underline',
  };
  
  const sizeClasses: Record<ButtonSize, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-12 px-8 text-base',
    icon: 'h-10 w-10',
  };
  
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};

type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';
type CardPadding = 'none' | 'sm' | 'default' | 'lg';

export interface CardVariants {
  variant?: CardVariant;
  padding?: CardPadding;
}

export const cardVariants = (props: CardVariants = {}): string => {
  const { variant = 'default', padding = 'default' } = props;
  
  const baseClasses = 'rounded-lg border transition-all duration-200';
  
  const variantClasses: Record<CardVariant, string> = {
    default: 'bg-white border-gray-200 shadow-card hover:shadow-card-hover',
    elevated: 'bg-white border-gray-200 shadow-soft',
    outlined: 'bg-white border-gray-300',
    ghost: 'bg-transparent border-transparent',
  };
  
  const paddingClasses: Record<CardPadding, string> = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };
  
  return `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]}`;
};

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';

export interface BadgeVariants {
  variant?: BadgeVariant;
}

export const badgeVariants = (props: BadgeVariants = {}): string => {
  const { variant = 'default' } = props;
  
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';
  
  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    destructive: 'bg-red-100 text-red-800',
    outline: 'border border-gray-300 text-gray-700',
  };
  
  return `${baseClasses} ${variantClasses[variant]}`;
};
