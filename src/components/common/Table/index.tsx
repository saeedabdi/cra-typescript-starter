import cn from 'classnames';
import { CSSProperties, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    CheckBoxWrapper,
    EmptyComponentsWrapper,
    LoadingComponentsWrapper,
    Table as TableStyle,
    TableCell,
    Th,
    Thead,
} from './table.style';

export interface TheadType<T> {
    title: string;
    key: string;
    style?: CSSProperties;
    className?: string;
    render?: (param?: string, rowData?: T) => ReactElement | string;
}
export interface TableState<T> {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: T[];
}
export interface TableProps<T> {
    columns: TheadType<T>[];
    data: Array<any>;
    onSelectedRowsChange?: (data: TableState<T>) => void;
    selectableRows?: boolean;
    keyExtractor: (item: T) => string;
    className?: Record<string, string> | string;
    isLoading?: boolean;
    theadClassName?: string;
}

function Table<T = any>({
    data,
    className,
    keyExtractor,
    columns,
    onSelectedRowsChange,
    isLoading,
    theadClassName,
    selectableRows,
}: TableProps<T>): JSX.Element {
    const { t } = useTranslation();
    const [tableStates, setTableState] = useState<TableState<T>>({
        allSelected: false,
        selectedCount: 0,
        selectedRows: [],
    });
    const handleCheckBoxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        rowData: T | any,
        index: number,
    ) => {
        if (event.target.checked) {
            const selectedRows = [...tableStates.selectedRows, rowData];
            const newTableStates = {
                allSelected: data.length === selectedRows.length,
                selectedCount: selectedRows.length + 1,
                selectedRows: selectedRows,
            };
            setTableState(newTableStates);
            onSelectedRowsChange?.(newTableStates);
        } else {
            const newTableState = {
                allSelected: false,
                selectedCount: tableStates.selectedRows.length + 1,
                selectedRows: tableStates.selectedRows.filter(
                    (item) => keyExtractor(item) !== keyExtractor(rowData),
                ),
            };
            setTableState(newTableState);
            onSelectedRowsChange?.(newTableState);
        }
    };
    const handleCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const newTableState = {
                allSelected: true,
                selectedCount: data.length + 1,
                selectedRows: data,
            };
            setTableState(newTableState);
            onSelectedRowsChange?.(newTableState);
        } else {
            const newTableState = {
                allSelected: false,
                selectedCount: 0,
                selectedRows: [],
            };
            onSelectedRowsChange?.(newTableState);
            setTableState(newTableState);
        }
    };

    return (
        <TableStyle className={cn(className)}>
            <thead className={theadClassName}>
                <tr>
                    {selectableRows && (
                        <Thead key="checkBox">
                            <div>
                                <input
                                    checked={tableStates.allSelected && data.length !== 0}
                                    onChange={handleCheckedAllChange}
                                    type="checkbox"
                                    name="select-all-rows"
                                />
                            </div>
                        </Thead>
                    )}
                    {columns.map((th) => (
                        <Th data-title={th.title} key={th.key}>
                            <div style={th.style}>
                                <span>{th.title}</span>
                            </div>
                        </Th>
                    ))}
                </tr>
            </thead>
            <tbody className="">
                {isLoading ? (
                    <tr>
                        <td colSpan={columns.length + 1}>
                            <LoadingComponentsWrapper className=" ">
                                <div>loading...</div>
                            </LoadingComponentsWrapper>
                        </td>
                    </tr>
                ) : data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length + 1}>
                            <EmptyComponentsWrapper className=" ">
                                {t('No data')}
                            </EmptyComponentsWrapper>
                        </td>
                    </tr>
                ) : (
                    data.map((tb, index) => {
                        return (
                            <tr
                                style={{
                                    height: 1,
                                }}
                                key={keyExtractor(tb)}
                            >
                                {selectableRows && (
                                    <CheckBoxWrapper>
                                        <label>
                                            <input
                                                type="checkbox"
                                                onChange={(e) => handleCheckBoxChange(e, tb, index)}
                                                checked={
                                                    !!tableStates.selectedRows.find(
                                                        (tableRow: T) =>
                                                            keyExtractor(tableRow) ===
                                                            keyExtractor(tb),
                                                    )
                                                }
                                                name={`select-row-${index}`}
                                            />
                                        </label>
                                    </CheckBoxWrapper>
                                )}
                                {columns.map((th) => {
                                    return (
                                        <TableCell
                                            style={{ height: '' }}
                                            data-title={th.title}
                                            key={th.key}
                                        >
                                            <div style={th.style}>
                                                <div className={cn(th.className)}>
                                                    {th.render
                                                        ? th.render(tb[th.key], tb)
                                                        : tb[th.key]}
                                                </div>
                                            </div>
                                        </TableCell>
                                    );
                                })}
                            </tr>
                        );
                    })
                )}
            </tbody>
        </TableStyle>
    );
}
export default Table;
