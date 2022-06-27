type Column<T extends string = string> = {
    header: string | JSX.Element | JSX.Element[];
    accessor: T;
    align?: 'left' | 'center' | 'right';
};

type Data<T extends string = string> = {
    [key in T]: string | JSX.Element | JSX.Element[] | number;
};

export interface ITable<T extends string = string> {
    columns: Column<T>[];
    data: Data<T>[];
}
