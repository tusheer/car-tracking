import React from 'react';
import { ITable } from './ITable';
import styles from './Table.module.scss';

function Table<T extends string = string>({ columns, data }: ITable<T>) {
    return (
        <table className={`w-full ${styles.root}`}>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th align={col.align || 'left'} key={col.accessor}>
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((d, i) => (
                    <tr key={i}>
                        {columns.map((col) => (
                            <td align={col.align || 'left'} key={col.accessor}>
                                <div>{d[col.accessor]}</div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
