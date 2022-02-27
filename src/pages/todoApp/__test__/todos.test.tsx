import { fireEvent, render, screen } from '@testing-library/react';
import i18n from 'i18n';
import { BrowserRouter } from 'react-router-dom';

import Todo from '..';

window.confirm = jest.fn(() => true);
const MockTodo = () => {
    return (
        <BrowserRouter>
            <Todo />
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
        // screen.debug();
        const divElement = screen.getByText(/Go Grocery Shopping/i);
        expect(divElement).toBeInTheDocument();
    });

    it('should render multiple items', () => {
        render(<MockTodo />);
        addTask(['Go Grocery Shopping', 'Go Grocery Shopping', 'Go Grocery Shopping']);
        const divElements = screen.queryAllByText(/Go Grocery Shopping/i);
        expect(divElements.length).toBe(3);
    });

    it('task should not have done button when initally rendered', () => {
        render(<MockTodo />);
        addTask(['Go Grocery Shopping']);
        const buttonElement = screen.getByRole('button', {
            name: /done/i,
        });
        expect(buttonElement).toBeInTheDocument();
    });

    it('task should have undone button when task have been done', () => {
        render(<MockTodo />);
        addTask(['Go Grocery Shopping']);
        const buttonElement = screen.getByRole('button', {
            name: /done/i,
        });
        fireEvent.click(buttonElement);
        const unDoneButtonElement = screen.getByRole('button', {
            name: /un done/i,
        });
        expect(unDoneButtonElement).toBeInTheDocument();
    });
    it('task should be delete when delete button clicked ', () => {
        render(<MockTodo />);
        addTask(['Go Grocery Shopping']);
        const buttonElement = screen.getByRole('button', {
            name: /delete/i,
        });
        fireEvent.click(buttonElement);

        expect(window.confirm).toBeCalled();
    });
});
