import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TodoType } from '.';

interface Props {
    onAdd: (value: TodoType) => void;
}

const AddTodo: FC<Props> = ({ onAdd }) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todoITem: TodoType = {
            title,
            id: new Date().getTime() + title,
            status: false,
        };
        if (title) {
            onAdd(todoITem);
            setTitle('');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="w-full flex py-4 justify-center items-end">
            <div className="w-full flex flex-col  ">
                <label className="capitalize pb-4 font-bold">{t('Title')}</label>

                <input
                    value={title}
                    onChange={handleChange}
                    className="w-full rounded-md border focus:ring-2 ring-blue-600 focus:outline-none border-gray-300 p-2"
                    name="title"
                />
            </div>
            <div className=" flex b px-8">
                <button
                    disabled={!title}
                    type="submit"
                    className="bg-green-600 disabled:opacity-50 text-white rounded-md px-3 py-2 hover:ring-2 ring-green-600 "
                >
                    {t('Add')}
                </button>
            </div>
        </form>
    );
};

export default AddTodo;
