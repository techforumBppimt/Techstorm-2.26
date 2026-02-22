import React from 'react';
import './spinner.css';

export const Spinner = ({ variant = 'classic', className = '', ...props }) => {
  const resolvedVariant = variant === 'diamond' ? 'diamond' : 'classic';
  const pixelCount = resolvedVariant === 'diamond' ? 4 : 8;

  return (
    <span
      className={`spinner-8bit spinner-8bit--${resolvedVariant} ${className}`.trim()}
      aria-label="Loading"
      role="status"
      {...props}
    >
      {Array.from({ length: pixelCount }, (_, index) => (
        <span
          key={`${resolvedVariant}-${index + 1}`}
          className={`spinner-8bit__pixel spinner-8bit__pixel--${index + 1}`}
        />
      ))}
    </span>
  );
};
