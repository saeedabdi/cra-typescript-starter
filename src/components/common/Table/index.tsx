import cn from 'classnames';
import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    EmptyComponentsWrapper,
    LoadingComponentsWrapper,
    Table as TableStyle,
    TableCell,
    Td,
    Thead,
} from './table.style';

export interface TheadType<T> {
    title: string;
    key: string;
    style?: CSSProperties;
    className?: string;
    render?: (param?: string, rowData?: T) => ReactElement | string;
}
export interface TableProps<T> {
    columns: TheadType<T>[];
    data: Array<any>;
    onSelectedRowsChange?: (data: T[], rowData?: T) => void;
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
    const [tbody, setTbody] = useState(
        selectableRows
            ? data.map((item) => {
                  return {
                      checked: false,
                      ...item,
                  };
              })
            : data,
    );

    useEffect(() => {
        setTbody(
            selectableRows
                ? data.map((item) => {
                      return {
                          checked: false,
                          ...item,
                      };
                  })
                : data,
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleCheckBoxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        rowData: T | any,
        index: number,
    ) => {
        const editedBodyData = tbody;
        if (event.target.checked) {
            editedBodyData[index]['checked'] = true;
            setTbody(editedBodyData);
        } else {
            editedBodyData[index]['checked'] = false;
            setTbody(editedBodyData);
        }

        onSelectedRowsChange?.(
            tbody
                .map((item) => ({ ...item, checked: true }))
                .map((data) => {
                    delete data.checked;
                    return { ...data };
                }),

            rowData,
        );
    };
    const handleCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setTbody((prev) => {
                return prev.map((item) => ({ ...item, checked: true }));
            });
            onSelectedRowsChange?.(
                tbody
                    .map((item) => ({ ...item, checked: true }))
                    .map((data) => {
                        delete data.checked;
                        return { ...data };
                    }),
            );
        } else {
            setTbody((prev) => {
                return prev.map((item) => ({ ...item, checked: false }));
            });
            onSelectedRowsChange?.([]);
        }
    };
    const isCheckedAll = !tbody.find((item) => !item.checked) && tbody.length != 0;

    return (
        <TableStyle className={cn(className)}>
            <thead className={theadClassName}>
                <tr>
                    {selectableRows && (
                        <Thead key="checkBox" className="px-0  whitespace-nowrap pt-4 pb-2  ">
                            <div>
                                <input
                                    checked={isCheckedAll}
                                    onChange={handleCheckedAllChange}
                                    type="checkbox"
                                    name="select-all-rows"
                                />
                            </div>
                        </Thead>
                    )}
                    {columns.map((th) => (
                        <Td data-title={th.title} key={th.key}>
                            <div style={th.style}>
                                <span>{th.title}</span>
                            </div>
                        </Td>
                    ))}
                </tr>
            </thead>
            <tbody className="">
                {isLoading ? (
                    <tr>
                        <td colSpan={columns.length + 1}>
                            <LoadingComponentsWrapper className="w-full flex justify-center items-center h-64">
                                <div>loading...</div>
                            </LoadingComponentsWrapper>
                        </td>
                    </tr>
                ) : tbody.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length + 1}>
                            <EmptyComponentsWrapper className="w-full flex justify-center items-center h-64">
                                {t('No data')}
                            </EmptyComponentsWrapper>
                        </td>
                    </tr>
                ) : (
                    tbody.map((tb, index) => {
                        return (
                            <tr
                                style={{
                                    height: 1,
                                }}
                                key={keyExtractor(tb)}
                            >
                                {selectableRows && (
                                    <Thead>
                                        <label>
                                            <input
                                                type="checkbox"
                                                onChange={(e) => handleCheckBoxChange(e, tb, index)}
                                                checked={tb.checked}
                                                name={`select-row-${index}`}
                                            />
                                        </label>
                                    </Thead>
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
