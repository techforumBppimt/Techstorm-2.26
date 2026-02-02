import React from 'react';
import './button.css';

export const Button = ({ 
    children, 
    variant = 'default', 
    className = '', 
    onClick,
    type = 'button',
    ...props 
}) => {
    const variantClass = variant === 'outline' ? 'button-outline' : 'button-default';
    
    return (
        <button 
            type={type}
            className={`button-8bit ${variantClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};
