import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { getUniqueId } from '../utils/utilFunctions';

const TransactionList = ({ id, children }) => {
    return (
        <Droppable droppableId={getUniqueId('transaction-list')}>
            {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <ul>{children}</ul>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TransactionList;
