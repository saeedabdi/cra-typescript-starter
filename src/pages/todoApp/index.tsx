import { css } from '@emotion/css';
import { Table, Tabs } from 'components/common';
import { TableState, TheadType } from 'components/common/Table';
import { ThemeContext } from 'context/themeContext';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRootStore } from 'store';
import useAppTheme from 'styles/theme/useAppTheme';

import AddTodo from './addTodo';
import { TodoType } from './addTodo/TodoType';
import { ButtonWrapper, ToggleThemeButtonWrapper, Wrapper } from './todo.style';

function TodoApp() {
    const { colors } = useAppTheme();
    const { toggleTheme, theme } = useContext(ThemeContext);
    const { todoStores: todoStores } = useRootStore();
    const [selectedTodos, setSelectedTodos] = useState<Array<TodoType>>([]);
    const { t } = useTranslation();
    const columns: TheadType<TodoType>[] = useMemo(() => {
        return [
            {
                key: 'title',
                title: t('Title'),
                className: css({
                    textAlign: 'center',
                }),
            },
            {
                key: 'status',
                className: css({
                    textAlign: 'center',
                }),
                title: t('Status'),
                render: (p, data) => {
                    return <>{data?.status ? t('complete') : t('incomplete')}</>;
                },
            },
            {
                key: 'actions',
                title: t('Actions'),
                className: css({
                    textAlign: 'center',
                }),
                render: (p, rowData) => {
                    return (
                        <ButtonWrapper>
                            <div className="flex">
                                <button
                                    onClick={() => handleDelete(rowData as TodoType)}
                                    className="deleteButton"
                                >
                                    {t('Delete')}
                                </button>
                                {!rowData?.status ? (
                                    <button
                                        onClick={() => handleChangeStatus(rowData as TodoType)}
                                        className="doneButton"
                                    >
                                        {t('Done')}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleChangeStatus(rowData as TodoType)}
                                        className="unDoneButton"
                                    >
                                        {t('Un done')}
                                    </button>
                                )}
                            </div>
                        </ButtonWrapper>
                    );
                },
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleDelete(rowData: TodoType) {
        todoStores.deleteTask(rowData.id);
    }
    function handleMultiDelete() {
        todoStores.multiDeleteTasks(selectedTodos.map((task) => task.id));
    }
    function handleChangeStatus(rowData: TodoType) {
        todoStores.changeStatus(rowData.id);
    }
    function handleMultiChangeStatus(status: boolean) {
        todoStores.changeMultiStatus({ ids: selectedTodos.map((task) => task.id), status });
    }
    const handleCheckbox = useCallback((data: TableState<TodoType>) => {
        setSelectedTodos(data.selectedRows);
    }, []);

    const allTasks = todoStores?.todos;
    const inCompletedTasks = todoStores?.todos.filter((todo) => !todo.status);
    const completedTasks = todoStores?.todos.filter((todo) => todo.status);
    const tabClassName = css({
        padding: '0.5rem',
        textAlign: 'center',
        borderBottom: `0.2rem solid transparent `,
        width: '100%',
    });
    const activeTabClassName = css({
        borderBottom: `0.2rem solid ${colors.red}`,
        width: '100%',
        textAlign: 'center',
        transition: 'all 0.1s ease-in',
        padding: '0.5rem',
    });
    const tabsClassName = css({
        width: ' 100%',
        cursor: 'pointer',
        padding: ' 0.5rem 0rem',
        transition: 'all 0.3s ease-in',
        marginBottom: '0.5rem',
        display: 'flex',
        color: colors.accent8,
        background: colors.accent0,
    });
    const tabNames = useMemo(() => [t('All'), t('Completed tasks'), t('In completed tasks')], [t]);
    return (
        <Wrapper>
            <div className="container">
                <ToggleThemeButtonWrapper>
                    <button onClick={toggleTheme}>{theme === 'dark' ? 'light' : 'dark'}</button>
                </ToggleThemeButtonWrapper>
                <AddTodo />
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
                    tabNames={tabNames}
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
                        data={completedTasks}
                        onSelectedRowsChange={handleCheckbox}
                        columns={columns}
                    />
                    <Table<TodoType>
                        keyExtractor={(item) => item.id}
                        selectableRows
                        data={inCompletedTasks}
                        onSelectedRowsChange={handleCheckbox}
                        columns={columns}
                    />
                </Tabs>
                {/* <pre>{JSON.stringify(todosStores.todos, null, 4)}</pre> */}
            </div>
        </Wrapper>
    );
}

export default observer(TodoApp);
