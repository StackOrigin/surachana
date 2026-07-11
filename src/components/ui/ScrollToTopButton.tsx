import "../../styles/components/ui/ScrollToTopButton.css";
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-navy-900 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gold-500 hover:text-navy-900 cursor-pointer",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
