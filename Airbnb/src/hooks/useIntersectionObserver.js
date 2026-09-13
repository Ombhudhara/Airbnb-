/**
 * src/hooks/useIntersectionObserver.js
 *
 * A custom hook to detect when an element enters the viewport.
 */
import { useEffect, useState, useRef } from 'react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Once it's in view, we can keep it triggered if we only want it to animate once.
      // Or we can toggle it. Here, we'll toggle it so it animates each time it comes into view,
      // or the consumer can use a one-shot state wrapper.
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [options.root, options.rootMargin, options.threshold]);

  return [targetRef, isIntersecting];
};

export default useIntersectionObserver;
