import React from 'react';

const Select = ({ children, handleChange, value }) => {
    return (
        <div className="select">
            <select onChange={handleChange} value={value}>
                {children}
            </select>
        </div>
    );
};

export default Select;
