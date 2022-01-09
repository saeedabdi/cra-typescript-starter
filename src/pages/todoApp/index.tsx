import { Table } from 'components/common';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddTodo from './addTodo';

export type TodoType = { title: string; status: boolean; id: string };

const TodoApp = () => {
    const [todos, setTodos] = useState<Array<TodoType>>([
        {
            title: '1',
            id: '1',
            status: false,
        },
    ]);

    const [slectedTodos, setSlectedTodos] = useState<Array<TodoType>>([]);
    const { t } = useTranslation();

    const handleDelete = (rowData: TodoType) => {
        if (window.confirm(t('Are you sure ?'))) {
            setTodos((prev) => prev.filter((item) => item.id !== rowData.id));
        }
    };
    const handleMultiDelete = () => {
        if (window.confirm(t('Are you sure ?'))) {
            slectedTodos.map((item) => {
                setTodos((i) => i.filter((t) => t.id != item.id));
                setSlectedTodos([]);
            });
        }
    };
    const handleChangeStatus = (status: boolean, rowData: TodoType) => {
        setTodos((prev) =>
            prev.map((item) => {
                if (item.id === rowData.id) {
                    item.status = status;
                    return item;
                }
                return item;
            }),
        );
    };
    const handleMultiChangeStatus = (status: boolean) => {
        if (window.confirm(t('Are you sure ?'))) {
            slectedTodos.map((item) => {
                setTodos((i) =>
                    i.map((t) => {
                        if (t.id === item.id) {
                            t.status = status;
                            return t;
                        }
                        return t;
                    }),
                );
                setSlectedTodos([]);
            });
        }
    };
    const handleCheckbox = (data: TodoType[], rowData?: TodoType) => {
        setSlectedTodos(data);
    };
    return (
        <div className="w-full flex flex-col lg:px-40">
            <AddTodo
                onAdd={(todoItem) => {
                    setTodos((prev) => {
                        return [...prev, todoItem];
                    });
                }}
            />
            {!!slectedTodos.length && (
                <div className="w-full flex justify-end py-4">
                    <div className="flex">
                        <button
                            onClick={handleMultiDelete}
                            className="px-3 py-2 rounded-md bg-red-600 text-white transition-all hover:ring-2 ring-red-600"
                        >
                            {t('Delete')}
                        </button>

                        <button
                            onClick={() => handleMultiChangeStatus(true)}
                            className="bg-green-600 mx-2  rounded-md text-white hover:ring-2 transition-all duration-200 ring--600 shadow-md  py-2 px-3 text-sm"
                        >
                            {t('Done')}
                        </button>

                        <button
                            onClick={() => handleMultiChangeStatus(false)}
                            className="bg-blue-600 text-white  hover:ring-2 transition-all duration-200 ring-blue-600  rounded-md shadow-md px-3 py-2 text-sm"
                        >
                            {t('Un done')}
                        </button>
                    </div>
                </div>
            )}
            <Table<TodoType>
                hasCheckBox
                tbody={todos}
                onCheckBoxChange={handleCheckbox}
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
                            return (
                                <>
                                    <button
                                        onClick={() => handleDelete(rowData as TodoType)}
                                        className="px-3 py-2 mr-2 rounded-md bg-red-600 text-white transition-all hover:ring-2 ring-red-600"
                                    >
                                        {t('Delete')}
                                    </button>
                                    {!rowData?.status ? (
                                        <button
                                            onClick={() =>
                                                handleChangeStatus(true, rowData as TodoType)
                                            }
                                            className="bg-green-600 w-20 rounded-md text-white hover:ring-2 transition-all duration-200 ring-green-600 shadow-md  py-2 px-3 text-sm"
                                        >
                                            {t('Done')}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleChangeStatus(false, rowData as TodoType)
                                            }
                                            className="bg-blue-600 w-20 text-white  hover:ring-2 transition-all duration-200 ring-blue-600  rounded-md shadow-md px-3 py-2 text-sm"
                                        >
                                            {t('Un done')}
                                        </button>
                                    )}
                                </>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
};

export default TodoApp;
