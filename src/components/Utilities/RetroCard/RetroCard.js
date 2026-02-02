import React from 'react';

const RetroCard = ({ 
    bg = '#ffffff', 
    textColor = '#000000', 
    borderColor = '#000000', 
    shadowColor = '#000000', 
    className = '', 
    children,
    style = {},
    onMouseEnter,
    onMouseLeave,
    onClick,
    ...rest
}) => {
    return (
        <div 
            className={className}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            style={{
                backgroundColor: bg,
                color: textColor,
                border: `4px solid ${borderColor}`,
                boxShadow: `8px 8px 0px ${shadowColor}`,
                position: 'relative',
                imageRendering: 'pixelated',
                transition: 'all 0.3s ease',
                ...style
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default RetroCard;
