import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRootStore } from 'store';

import { TodoType } from '../addTodo/TodoType';
import { ButtonWrapper, Form, InputWrapper } from './addTodo.styles';

function AddTodo() {
    const { todoStores } = useRootStore();
    const { t } = useTranslation();
    const [title, setTitle] = useState<string>('');
    function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
        setTitle(value);
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const todoITem: TodoType = {
            title,
            id: new Date().getTime() + title,
            status: false,
        };
        if (title) {
            todoStores?.addTask(todoITem);
            setTitle('');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputWrapper>
                <label>{t('Title')}</label>
                <input
                    value={title}
                    placeholder={t('Add a new task here')}
                    onChange={handleChange}
                    name="title"
                />
            </InputWrapper>
            <ButtonWrapper>
                <button disabled={!title} type="submit">
                    {t('Add')}
                </button>
            </ButtonWrapper>
        </Form>
    );
}

export default observer(AddTodo);
