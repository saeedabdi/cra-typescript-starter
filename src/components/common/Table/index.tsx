import cn from 'classnames';
import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

            console.log('🚀 ~ file: index.tsx ~ line 68 ~ editedBodyData', editedBodyData);
            console.log('🚀 ~ file: index.tsx ~ line 65 ~ tbody', tbody);
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
        <table className={cn(className, 'relative w-full ')}>
            <thead className={theadClassName}>
                <tr>
                    {selectableRows && (
                        <th key="checkBox" className="px-0  whitespace-nowrap pt-4 pb-2  ">
                            <div className={cn('px-2 border-b-2  border-orange')}>
                                <input
                                    checked={isCheckedAll}
                                    onChange={handleCheckedAllChange}
                                    className="w-5  h-5"
                                    type="checkbox"
                                    name="select-all-rows"
                                />
                            </div>
                        </th>
                    )}
                    {columns.map((th) => (
                        <td
                            data-title={th.title}
                            className="px-0  whitespace-nowrap pt-4 pb-2  "
                            key={th.key}
                        >
                            <div
                                style={th.style}
                                className={cn(th.className, 'px-2 border-b-2  border-orange')}
                            >
                                <span>{th.title}</span>
                            </div>
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody className="">
                {isLoading ? (
                    <tr>
                        <td colSpan={columns.length + 1}>
                            <div className="w-full flex justify-center items-center h-64">
                                <div>loading...</div>
                            </div>
                        </td>
                    </tr>
                ) : tbody.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length + 1}>
                            <div className="w-full flex justify-center items-center h-64">
                                {t('No data')}
                            </div>
                        </td>
                    </tr>
                ) : (
                    tbody.map((tb, index) => {
                        const key = keyExtractor(tb);
                        return (
                            <tr
                                style={{
                                    height: 1,
                                }}
                                key={key}
                            >
                                {selectableRows && (
                                    <th className="px-0  whitespace-nowrap   ">
                                        <label className={cn('px-2 ')}>
                                            <input
                                                className="w-5  h-5"
                                                type="checkbox"
                                                onChange={(e) => handleCheckBoxChange(e, tb, index)}
                                                checked={tb.checked}
                                                name={`select-row-${index}`}
                                            />
                                        </label>
                                    </th>
                                )}
                                {columns.map((th) => {
                                    return (
                                        <td
                                            style={{ height: '' }}
                                            className={cn('p-0 h-inherit text-primary')}
                                            data-title={th.title}
                                            key={th.key}
                                        >
                                            <div style={th.style} className={cn('py-1 h-full')}>
                                                <div className={cn(th.className)}>
                                                    {th.render
                                                        ? th.render(tb[th.key], tb)
                                                        : tb[th.key]}
                                                </div>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
}
export default Table;
