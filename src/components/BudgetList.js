import React from 'react';

const BudgetList = ({ children, name }) => {
    return (
        <div className="box" style={{ marginBottom: '2rem' }}>
            <h5 className="title is-5">{name}</h5>
            {children}
        </div>
    );
};

export default BudgetList;
