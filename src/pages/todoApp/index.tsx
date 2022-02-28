import { Table, Tabs } from 'components/common';
import { TheadType } from 'components/common/Table';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddTodo from './addTodo';
import { TodoType } from './TodoType';

const TodoApp = () => {
    const [todos, setTodos] = useState<Array<TodoType>>([]);
    const [slectedTodos, setSlectedTodos] = useState<Array<TodoType>>([]);
    const { t } = useTranslation();
    const columns: TheadType<TodoType>[] = useMemo(() => {
        const handleDelete = (rowData: TodoType) => {
            if (window.confirm(t('Are you sure ?'))) {
                setTodos((prev) => prev.filter((item) => item.id !== rowData.id));
            }
        };
        return [
            {
                key: 'title',
                title: t('Title'),
                className: 'text-center',
            },
            {
                key: 'status',
                className: 'w-full text-center',
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
                                    onClick={() => handleChangeStatus(true, rowData as TodoType)}
                                    className="bg-green-600 w-20 rounded-md text-white hover:ring-2 transition-all duration-200 ring-green-600 shadow-md  py-2 px-3 text-sm"
                                >
                                    {t('Done')}
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleChangeStatus(false, rowData as TodoType)}
                                    className="bg-blue-600 w-20 text-white  hover:ring-2 transition-all duration-200 ring-blue-600  rounded-md shadow-md px-3 py-2 text-sm"
                                >
                                    {t('Un done')}
                                </button>
                            )}
                        </>
                    );
                },
            },
        ];
    }, [t]);

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
    const handleCheckbox = useCallback((data: TodoType[], rowData?: TodoType) => {
        console.log('🚀 ~ file: index.tsx ~ line 104 ~ handleCheckbox ~ data', data);
        setSlectedTodos(data);
    }, []);

    const allTasks = useMemo(() => todos, [todos]);
    const inComplatedTasks = useMemo(() => allTasks.filter((todo) => !todo.status), [allTasks]);
    const complatedTasks = useMemo(() => allTasks.filter((todo) => todo.status), [allTasks]);

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
            <Tabs
                tabsClassName="w-full py-2 mb-2"
                tabClassName="p-2 text-center w-full"
                activeTabClassName="border-b-4 text-center p-2 w-full border-red-600"
                tabNames={[t('All'), t('Dones'), t('Un dones')]}
            >
                <Table<TodoType>
                    selectableRows
                    data={allTasks}
                    onSelectedRowsChange={handleCheckbox}
                    columns={columns}
                />
                <Table<TodoType>
                    selectableRows
                    data={complatedTasks}
                    onSelectedRowsChange={handleCheckbox}
                    columns={columns}
                />
                <Table<TodoType>
                    selectableRows
                    data={inComplatedTasks}
                    onSelectedRowsChange={handleCheckbox}
                    columns={columns}
                />
            </Tabs>
        </div>
    );
};

export default TodoApp;
