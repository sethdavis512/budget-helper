import React from 'react';
import numeral from 'numeral';
import { Droppable } from 'react-beautiful-dnd';

const BudgetListItem = ({ id, transactions }) => {
    return (
        <Droppable droppableId={id}>
            {provided => (
                <div
                    style={{
                        position: 'relative'
                    }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    <p style={{ marginBottom: '1rem' }}>
                        {transactions
                            .reduce((acc, cur) => {
                                acc.add(numeral(cur['Amount']).value());

                                return acc;
                            }, numeral(0))
                            .format()}
                    </p>
                    <div
                        style={{
                            border: '1px dashed green',
                            padding: '1rem',
                            textAlign: 'center'
                        }}
                    >
                        +{provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default BudgetListItem;
