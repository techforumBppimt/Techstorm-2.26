import React, { useRef, useEffect, useState } from 'react';

/**
 * LazyImage - Optimized lazy loading image component
 * Reduces initial bandwidth by loading images only when they're near viewport
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes
 * @param {object} style - Inline styles
 * @param {string} placeholder - Placeholder image (tiny blur-up)
 * @param {number} offset - Distance from viewport to start loading (default: 100px)
 * @param {function} onLoad - Callback when image loads
 */
const LazyImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  placeholder = '',
  offset = 100,
  onLoad,
  ...props
}) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: `${offset}px`,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [offset]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <img
      ref={imgRef}
      src={isInView ? src : placeholder || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'}
      alt={alt}
      className={`${className} ${isLoaded ? 'lazy-loaded' : 'lazy-loading'}`}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.5,
        transition: 'opacity 0.3s ease-in-out',
      }}
      onLoad={handleLoad}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;
