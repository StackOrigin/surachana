import "../../styles/components/ui/Button.css";
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | "button__variant-001" | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
}

export default function Button({ variant = 'primary', size = 'md', children, className, href, ...props }: ButtonProps) {
  const base = "button__variant-002";
  
  const variants = {
    primary: "button__variant-003",
    secondary: "button__variant-004",
    outline: "button__variant-005",
    ghost: "button__variant-006",
  };

  const sizes = {
    sm: "button__variant-007",
    md: "button__variant-008",
    lg: "button__variant-009",
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
