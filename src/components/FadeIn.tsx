import React, { useRef, useEffect, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; /* delay in ms */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function FadeIn({ children, className = '', delay = 0, direction = 'up' }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const directionClasses = {
    up: 'translate-y-12',
    down: '-translate-y-12',
    left: 'translate-x-12',
    right: '-translate-x-12',
    none: '',
  };

  const transformStyle = isVisible
    ? 'opacity-100 translate-y-0 translate-x-0'
    : `opacity-0 ${directionClasses[direction]}`;

  return (
    <div
      ref={domRef}
      className={`transition-all ${transformStyle} ${className}`}
      style={{ 
        transitionDuration: '800ms',
        transitionTimingFunction: 'cubic-bezier(0.25,0.1,0.25,1)',
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
}





