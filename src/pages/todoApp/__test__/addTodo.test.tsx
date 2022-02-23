import { fireEvent, render, screen } from '@testing-library/react';

import AddTodo from '../addTodo';

const mockedSetTodo = jest.fn();
const MockAddTodo = () => <AddTodo onAdd={mockedSetTodo} />;

describe('Add todo  components ', () => {
    it('should render input element', () => {
        render(<MockAddTodo />);
        const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
        expect(inputElement).toBeInTheDocument();
    });

    it('should be able to type into input', () => {
        render(<MockAddTodo />);
        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/Add a new task here/i);
        expect(inputElement).toBeInTheDocument();
        fireEvent.click(inputElement);
        fireEvent.change(inputElement, {
            target: {
                value: 'Clean the house',
            },
        });

        expect(inputElement.value).toBe('Clean the house');
    });
    it('should be able to type into input', () => {
        render(<MockAddTodo />);
        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/Add a new task here/i);
        expect(inputElement).toBeInTheDocument();
        fireEvent.click(inputElement);
        fireEvent.change(inputElement, {
            target: {
                value: 'Clean the house',
            },
        });
        const buttonElement = screen.getByRole('button', { name: /Add/i });
        fireEvent.click(buttonElement);
        expect(mockedSetTodo).toBeCalled();
    });
    it('should have empty input when add button is clicked', () => {
        render(<MockAddTodo />);
        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/Add a new task here/i);
        expect(inputElement).toBeInTheDocument();
        fireEvent.click(inputElement);
        fireEvent.change(inputElement, {
            target: {
                value: 'Clean the house',
            },
        });
        const buttonElement = screen.getByRole('button', { name: /Add/i });
        fireEvent.click(buttonElement);
        expect(inputElement.value).toBe('');
    });
});
