import { Table } from 'components/common';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type TodoType = { title: string; status: boolean; id: number };

const TodoApp = () => {
    const [todos, setTodos] = useState<Array<TodoType>>([
        {
            title: '1',
            id: 1,
            status: false,
        },
    ]);
    const { t } = useTranslation();
    return (
        <div className="w-full flex flex-col lg:px-40">
            <Table<TodoType>
                tbody={todos}
                thead={[
                    {
                        key: 'title',
                        title: t('Title'),
                        className: 'text-center',
                    },
                    {
                        key: 'status',
                        className: 'text-center',
                        title: t('Status'),
                        render: (p, data) => {
                            return <>{data?.status ? t('complete') : t('incomplete')}</>;
                        },
                    },
                    {
                        key: 'actions',
                        title: t('Actions'),
                        className: 'flex justify-center',
                        render: (p, rowData) => {
                            if (rowData?.status) {
                                return (
                                    <button className="bg-red-600 rounded-md text-white hover:ring-2 transition-all duration-200 ring-red-600 shadow-md py-2 text-sm">
                                        {t('Un done')}
                                    </button>
                                );
                            }
                            return (
                                <button className="bg-blue-600 text-white  hover:ring-2 transition-all duration-200 ring-blue-600  rounded-md shadow-md px-3 py-2 text-sm">
                                    {t('Un done')}
                                </button>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
};

export default TodoApp;
