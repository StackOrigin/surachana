import "../../styles/components/layout/RouteTransition.css";
import { useLayoutEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { resetScrollImmediately } from '../../utils/scroll';

export default function RouteTransition({ children }: { children: ReactNode }) {
  const location = useLocation();

  useLayoutEffect(() => {
    resetScrollImmediately();
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="route-enter">
      {children}
    </div>
  );
}
