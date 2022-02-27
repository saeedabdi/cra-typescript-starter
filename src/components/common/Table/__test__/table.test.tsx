import { fireEvent, render } from '@testing-library/react';
import i18n from 'i18n';

import Table, { TheadType } from '..';

type MockDataType = {
    columns: TheadType<{
        id: number;
        some: {
            name: string;
        };
    }>[];
    data: {
        id: number;
        some: {
            name: string;
        };
    }[];
};

const dataMock = (): MockDataType => {
    return {
        columns: [
            {
                title: 'test',
                key: 'some',
                render: (param, row) => <>{row?.some.name},</>,
            },
        ],
        data: [
            {
                id: 1,
                some: { name: 'Apple' },
            },
            {
                id: 2,
                some: { name: 'Zuchinni' },
            },
        ],
    };
};

describe('Table component test', () => {
    beforeAll(() => {
        const i = i18n;
    });
    it('should render and empty table correctly', () => {
        const { container } = render(<Table columns={[]} data={[]} />);

        expect(container.firstChild).toMatchSnapshot();
    });
    it('should render the correctly when using render function', () => {
        type TestData = {
            id: number;
            name: string;
        };

        const data: TestData[] = [{ id: 1, name: 'name' }];

        const { container } = render(
            <Table<TestData>
                data={data}
                columns={[
                    { title: 'name', key: 'name', render: (params, row) => <>{row?.name}</> },
                ]}
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
describe('Table::onSelectedRowsChange', () => {
    it('should call onSelectedRowsChange with the correct values when select all rows is selected', () => {
        const mock = dataMock();
        const updatedMock = jest.fn();
        const { container } = render(
            <Table
                data={mock.data}
                columns={mock.columns}
                selectableRows
                onSelectedRowsChange={updatedMock}
            />,
        );

        fireEvent.click(
            container.querySelector('input[name="select-all-rows"]') as HTMLInputElement,
        );

        expect(updatedMock).toBeCalledWith(mock.data);
    });

    it('should call onSelectedRowsChange with the correct values when all rows are selected', () => {
        const mock = dataMock();
        const updatedMock = jest.fn();
        const { container } = render(
            <Table
                data={mock.data}
                columns={mock.columns}
                selectableRows
                onSelectedRowsChange={updatedMock}
            />,
        );

        fireEvent.click(container.querySelector('input[name="select-row-0"]') as HTMLInputElement);
        fireEvent.click(container.querySelector('input[name="select-row-1"]') as HTMLInputElement);

        expect(updatedMock).toBeCalledWith(mock.data, mock.data[1]);
    });
});
describe('data prop changes', () => {
    test('should update state if the data prop changes', () => {
        const mock = dataMock();
        const { container, rerender } = render(<Table data={mock.data} columns={mock.columns} />);

        rerender(
            <Table data={[{ id: 1, some: { name: 'Someone else' } }]} columns={mock.columns} />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
