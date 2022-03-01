import { css } from '@emotion/css';
import { Table, Tabs } from 'components/common';
import { TheadType } from 'components/common/Table';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { theme, toggleTheme } from 'styles/theme';

import AddTodo from './addTodo';
import { TodoType } from './addTodo/TodoType';
import { ButtonWrapper, ToggleThemeButtonWrapper, Wrapper } from './todo.style';

const TodoApp = () => {
    const currentTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    console.log('🚀 ~ file: index.tsx ~ line 14 ~ TodoApp ~ currentTheme', currentTheme);
    const handleChangeTheme = () => {
        if (!currentTheme || currentTheme === 'light') {
            localStorage.setItem('theme', 'dark');
            toggleTheme('dark');
        } else {
            toggleTheme('light');
            localStorage.setItem('theme', 'light');
        }
    };
    const [todos, setTodos] = useState<Array<TodoType>>([]);
    const [selectedTodos, setSelectedTodos] = useState<Array<TodoType>>([]);
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
            selectedTodos.map((item) => {
                setTodos((i) => i.filter((t) => t.id != item.id));
                setSelectedTodos([]);
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
            selectedTodos.map((item) => {
                setTodos((i) =>
                    i.map((t) => {
                        if (t.id === item.id) {
                            t.status = status;
                            return t;
                        }
                        return t;
                    }),
                );
                setSelectedTodos([]);
            });
        }
    };
    const handleCheckbox = useCallback((data: TodoType[], rowData?: TodoType) => {
        setSelectedTodos(data);
    }, []);

    const allTasks = useMemo(() => todos, [todos]);
    const inComplatedTasks = useMemo(() => allTasks.filter((todo) => !todo.status), [allTasks]);
    const complatedTasks = useMemo(() => allTasks.filter((todo) => todo.status), [allTasks]);
    const tabClassName = css({
        padding: '0.5rem',
        textAlign: 'center',
        borderBottom: `0.2rem solid ${theme?.colors?.['accent-0']}`,
        width: '100%',
    });
    const activeTabClassName = css({
        borderBottom: `0.2rem solid ${theme?.colors?.['red']}`,
        width: '100%',
        textAlign: 'center',
        transition: 'all 0.1s ease-in',
        padding: '0.5rem',
    });
    const tabsClassName = css({
        width: ' 100%',
        padding: ' 0.5rem 0rem',
        transition: 'all 0.3s ease-in',
        marginBottom: '0.5rem',

        color: theme?.colors?.['accent-8'],
        background: theme?.colors?.['accent-0'],
    });

    return (
        <Wrapper>
            <ToggleThemeButtonWrapper>
                <button onClick={handleChangeTheme}>
                    {currentTheme === 'dark' ? 'light' : 'dark'}
                </button>
            </ToggleThemeButtonWrapper>
            <AddTodo
                onAdd={(todoItem) => {
                    setTodos((prev) => {
                        return [...prev, todoItem];
                    });
                }}
            />
            {!!selectedTodos.length && (
                <ButtonWrapper>
                    <div className="flex">
                        <button onClick={handleMultiDelete} className="deleteButton">
                            {t('Delete')}
                        </button>

                        <button
                            onClick={() => handleMultiChangeStatus(true)}
                            className="doneButton"
                        >
                            {t('Done')}
                        </button>

                        <button
                            onClick={() => handleMultiChangeStatus(false)}
                            className="unDoneButton"
                        >
                            {t('Un done')}
                        </button>
                    </div>
                </ButtonWrapper>
            )}
            <Tabs
                tabsClassName={tabsClassName as unknown as string}
                tabClassName={tabClassName as unknown as string}
                activeTabClassName={activeTabClassName as unknown as string}
                tabNames={[t('All'), t('Dones'), t('Un dones')]}
            >
                <Table<TodoType>
                    selectableRows
                    data={allTasks}
                    keyExtractor={(item) => item.id}
                    onSelectedRowsChange={handleCheckbox}
                    columns={columns}
                />
                <Table<TodoType>
                    keyExtractor={(item) => item.id}
                    selectableRows
                    data={complatedTasks}
                    onSelectedRowsChange={handleCheckbox}
                    columns={columns}
                />
                <Table<TodoType>
                    keyExtractor={(item) => item.id}
                    selectableRows
                    data={inComplatedTasks}
                    onSelectedRowsChange={handleCheckbox}
                    columns={columns}
                />
            </Tabs>
        </Wrapper>
    );
};

export default TodoApp;
