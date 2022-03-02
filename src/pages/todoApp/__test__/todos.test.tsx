import { createSerializer } from '@emotion/jest';
import { fireEvent, render, screen } from '@testing-library/react';
import i18n from 'i18n';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { RootStore } from 'store';

import Todo from '..';

expect.addSnapshotSerializer(createSerializer());
window.confirm = jest.fn(() => true);
const rootStore = new RootStore();
const MockTodo = () => {
    return (
        <BrowserRouter>
            <Provider {...rootStore.getProviderStores()}>
                <Todo />
            </Provider>
        </BrowserRouter>
    );
};

const addTask = (tasks: string[]) => {
    const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    tasks.forEach((task) => {
        fireEvent.change(inputElement, { target: { value: task } });
        fireEvent.click(buttonElement);
    });
};
describe('Todo lists', () => {
    beforeAll(() => {
        const i = i18n;
    });
    it('should be able to type into input', () => {
        render(<MockTodo />);
        addTask(['Go Grocery Shopping']);
        const divElement = screen.getByText(/Go Grocery Shopping/i);
        const buttonElement = screen.getByRole('button', {
            name: /delete/i,
        });
        expect(divElement).toBeInTheDocument();
        fireEvent.click(buttonElement);
    });

    it('should render multiple items', () => {
        render(<MockTodo />);
        // screen.debug();
        addTask(['Go Grocery Shopping']);
        const buttonElement = screen.getByRole('button', {
            name: /delete/i,
        });
        const divElements = screen.queryAllByText(/Go Grocery Shopping/i);
        expect(divElements.length).toBe(1);
        fireEvent.click(buttonElement);
    });

    it('task should not have done button when initally rendered', () => {
        render(<MockTodo />);
        addTask(['Go Grocery Shopping']);
        const deleteElement = screen.getByRole('button', {
            name: /delete/i,
        });
        const buttonElement = screen.getByRole('button', {
            name: /done/i,
        });
        expect(buttonElement).toBeInTheDocument();

        fireEvent.click(deleteElement);
    });

    it('task should have undone button when task have been done', () => {
        render(<MockTodo />);
        addTask(['Go Grocery Shopping']);
        const deleteElement = screen.getByRole('button', {
            name: /delete/i,
        });
        const buttonElement = screen.getByRole('button', {
            name: /done/i,
        });
        fireEvent.click(buttonElement);
        const unDoneButtonElement = screen.getByRole('button', {
            name: /un done/i,
        });
        expect(unDoneButtonElement).toBeInTheDocument();
        fireEvent.click(deleteElement);
    });
    it('task should be delete when delete button clicked ', () => {
        render(<MockTodo />);
        addTask(['Go Grocery Shopping']);
        const buttonElement = screen.getByRole('button', {
            name: /delete/i,
        });
        fireEvent.click(buttonElement);
        const divElements = screen.queryAllByText(/Go Grocery Shopping/i);
        expect(divElements.length).toBe(0);
    });
});
