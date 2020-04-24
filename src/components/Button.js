import React from 'react';
import PropTypes from 'prop-types';

function Button({
    buttonClass = 'is-default',
    handleClick,
    text = 'Add',
    type = 'button',
    ...rest
}) {
    return (
        <button
            className={`button ${buttonClass}`}
            onClick={handleClick}
            type={type}
            {...rest}
        >
            {text}
        </button>
    );
}

Button.propTypes = {
    buttonClass: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    type: PropTypes.string
};

export default Button;
