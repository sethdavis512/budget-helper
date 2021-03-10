import React from 'react';

const TableRow = ({ row, isHeader = false }) => {
    return (
        <tr>
            {row.map((text, idx) => {
                if (idx === 0 || idx > 3 || text.trim() === '') {
                    return null;
                } else {
                    return isHeader ? (
                        <th key={`header-${idx}`}>{text}</th>
                    ) : (
                        <td key={`cell-${idx}`}>{text}</td>
                    );
                }
            })}
        </tr>
    );
};

const Table = ({ data }) => {
    return (
        <div className="table-container">
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <tbody>
                    {data.map(row => (
                        <TableRow row={row} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
