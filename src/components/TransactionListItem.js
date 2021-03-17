import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TransactionListItem = ({ amount, date, description, id, index }) => {
    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="box"
                >
                    <img
                        src="https://img.icons8.com/metro/50/000000/resize-four-directions.png"
                        width="12"
                        alt="Drag and drop handle"
                        style={{ marginRight: '0.5em' }}
                    />
                    {date}
                    {description}
                    {amount}
                </li>
            )}
        </Draggable>
    );
};

export default TransactionListItem;
