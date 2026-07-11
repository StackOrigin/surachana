import "../../styles/components/ui/Button.css";
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
}

export default function Button({ variant = 'primary', size = 'md', children, className, href, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-bold transition-all duration-300 cursor-pointer whitespace-nowrap";
  
  const variants = {
    primary: "bg-navy-950 text-white hover:bg-gold-400 hover:text-navy-950",
    secondary: "bg-gold-400 text-navy-950 hover:bg-gold-300",
    outline: "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
    ghost: "text-navy-700 hover:text-navy-900 hover:bg-navy-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
