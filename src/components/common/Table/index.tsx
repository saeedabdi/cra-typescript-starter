import cn from 'classnames';
import { CSSProperties, ReactElement } from 'react';
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
    className?: Record<string, string> | string;
    isLoading?: boolean;
    theadClassName?: string;
}

function Table<T = any>({ tbody, className, thead, isLoading, theadClassName }: TableProps<T>) {
    const { t } = useTranslation();
    let key = 0;

    return (
        <table className={cn(className, 'relative w-full ')}>
            <thead className={theadClassName}>
                <th className="px-0  whitespace-nowrap pt-4 pb-2  ">
                    <div className={cn('px-2 border-b-2  border-orange')}>
                        <input className="w-5  h-5" type="checkbox" name="checkbox" />
                    </div>
                </th>
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
                    tbody.map((tb) => {
                        key++;
                        return (
                            <tr
                                style={{
                                    height: 1,
                                }}
                                key={key}
                            >
                                <th className="px-0  whitespace-nowrap   ">
                                    <label className={cn('px-2 ')}>
                                        <input
                                            className="w-5  h-5"
                                            type="checkbox"
                                            name="checkbox"
                                        />
                                    </label>
                                </th>
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
