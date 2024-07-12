import React from 'react';

const Button = ({
    classNames,
    onClick,
    testId,
    children,
}) => {
    return (
        <button
            type="button"
            data-testid={testId}
            className={classNames}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;
