import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

const Table = ({ columns, data, RowComponent, onSave, onDelete }) => {
    return (
        <BootstrapTable striped bordered hover>
            <thead>
                <tr>
                    {columns.map(({ name, width }) => (
                        <th key={name} style={{ width: `${width}px` }}>{name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <RowComponent
                        key={item._id}
                        item={item}
                        onSave={onSave}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </BootstrapTable>
    );
};

export default Table;