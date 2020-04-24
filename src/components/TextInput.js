import React from 'react';
import PropTypes from 'prop-types';

function TextInput({
    handleChange,
    id,
    label = 'Label',
    placeholder = 'Enter text',
    type = 'text',
    value,
    ...rest
}) {
    return (
        <div className="field">
            {label && (
                <label className="label" htmlFor={id}>
                    {label}:
                </label>
            )}
            <div className="control">
                <input
                    className="input"
                    id={id}
                    onChange={handleChange}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    {...rest}
                />
            </div>
        </div>
    );
}

TextInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired
};

export default TextInput;
