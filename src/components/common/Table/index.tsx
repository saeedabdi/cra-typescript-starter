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
    thead: TheadType<T>[];
    tbody: Array<any>;
    onCheckBoxChange?: (data: T[], rowData?: T) => void;
    hasCheckBox?: boolean;
    className?: Record<string, string> | string;
    isLoading?: boolean;
    theadClassName?: string;
}

function Table<T = any>({
    tbody: _tbody,
    className,
    thead,
    onCheckBoxChange,
    isLoading,
    theadClassName,
    hasCheckBox,
}: TableProps<T>) {
    const { t } = useTranslation();
    const [, setforceRender] = useState(false);
    const [tbody, setTbody] = useState(
        hasCheckBox
            ? _tbody.map((item) => {
                  return {
                      checked: false,
                      ...item,
                  };
              })
            : _tbody,
    );

    useEffect(() => {
        setTbody(
            hasCheckBox
                ? _tbody.map((item) => {
                      return {
                          checked: false,
                          ...item,
                      };
                  })
                : _tbody,
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_tbody]);

    const handleCheckBoxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        rowData: T,
        index: number,
    ) => {
        const editedBodyData = tbody;
        if (e.target.checked) {
            editedBodyData[index]['checked'] = true;
            setTbody(editedBodyData);
        } else {
            editedBodyData[index]['checked'] = false;
            setTbody(editedBodyData);
        }
        setforceRender((prev) => !prev);
        onCheckBoxChange?.(
            tbody.filter((data) => data.checked),
            rowData,
        );
    };
    const handleCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setTbody((prev) => {
                return prev.map((item) => ({ ...item, checked: true }));
            });
            onCheckBoxChange?.(tbody.map((item) => ({ ...item, checked: true })));
        } else {
            setTbody((prev) => {
                return prev.map((item) => ({ ...item, checked: false }));
            });
            onCheckBoxChange?.([]);
        }
    };
    const isCheckedAll = !!!tbody.find((item) => !item.checked);

    let key = 0;
    return (
        <table className={cn(className, 'relative w-full ')}>
            <thead className={theadClassName}>
                {hasCheckBox && (
                    <th key="checkBox" className="px-0  whitespace-nowrap pt-4 pb-2  ">
                        <div className={cn('px-2 border-b-2  border-orange')}>
                            <input
                                checked={isCheckedAll}
                                onChange={handleCheckedAllChange}
                                className="w-5  h-5"
                                type="checkbox"
                                name="checkbox"
                            />
                        </div>
                    </th>
                )}
                {thead.map((th, index) => (
                    <th className="px-0  whitespace-nowrap pt-4 pb-2  " key={index}>
                        <div
                            style={th.style}
                            className={cn(th.className, 'px-2 border-b-2  border-orange')}
                        >
                            <span>{th.title}</span>
                        </div>
                    </th>
                ))}
            </thead>
            <tbody className="">
                {isLoading ? (
                    <tr>
                        <td colSpan={thead.length + 1}>
                            <div className="w-full flex justify-center items-center h-64">
                                <div>loading...</div>
                            </div>
                        </td>
                    </tr>
                ) : !!!tbody.length ? (
                    <tr>
                        <td colSpan={thead.length + 1}>
                            <div className="w-full flex justify-center items-center h-64">
                                {t('No data')}
                            </div>
                        </td>
                    </tr>
                ) : (
                    tbody.map((tb, index) => {
                        key++;
                        return (
                            <tr
                                style={{
                                    height: 1,
                                }}
                                key={key}
                            >
                                {hasCheckBox && (
                                    <th key="checkbox" className="px-0  whitespace-nowrap   ">
                                        <label className={cn('px-2 ')}>
                                            <input
                                                className="w-5  h-5"
                                                type="checkbox"
                                                onChange={(e) => handleCheckBoxChange(e, tb, index)}
                                                checked={tb.checked}
                                                name="checkbox"
                                            />
                                        </label>
                                    </th>
                                )}
                                {thead.map((th, index) => {
                                    return (
                                        <td
                                            style={{ height: '' }}
                                            className={cn('p-0 h-inherit text-primary')}
                                            data-title={th.title}
                                            key={index}
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
