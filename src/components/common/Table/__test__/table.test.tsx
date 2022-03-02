import { fireEvent, render } from '@testing-library/react';
import i18n from 'i18n';
import renderer from 'react-test-renderer';

import Table, { TableState, TheadType } from '../index';

interface TestType {
    id: number;
    some: {
        name: string;
    };
}
type MockDataType = {
    columns: TheadType<TestType>[];
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
                render: (param, row) => <>{row?.some?.name ?? ''}</>,
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
        expect(
            renderer
                .create(<Table keyExtractor={(item) => String(item.id)} columns={[]} data={[]} />)
                .toJSON(),
        ).toMatchSnapshot();
    });
    it('should render the correctly when using render function', () => {
        type TestData = {
            id: number;
            name: string;
        };

        const data: TestData[] = [{ id: 1, name: 'name' }];

        const tree = renderer
            .create(
                <Table<TestData>
                    data={data}
                    keyExtractor={(item) => String(item.id)}
                    columns={[
                        { title: 'name', key: 'name', render: (params, row) => <>{row?.name}</> },
                    ]}
                />,
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
describe('Table::onSelectedRowsChange', () => {
    it('should call onSelectedRowsChange with the correct values when select all rows is selected', () => {
        const mock = dataMock();
        const updatedMock = jest.fn();
        const { container } = render(
            <Table
                data={mock.data}
                keyExtractor={(item) => String(item.id)}
                columns={mock.columns}
                selectableRows
                onSelectedRowsChange={updatedMock}
            />,
        );
        fireEvent.click(
            container.querySelector('input[name="select-all-rows"]') as HTMLInputElement,
        );
        expect(updatedMock).toBeCalledWith({
            allSelected: true,
            selectedCount: mock.data.length + 1,
            selectedRows: mock.data,
        } as TableState<TestType>);
    });
    it('should call onSelectedRowsChange with the correct values when all rows are selected', () => {
        const mock = dataMock();
        const updatedMock = jest.fn();
        const { container } = render(
            <Table
                data={mock.data}
                columns={mock.columns}
                keyExtractor={(item) => String(item.id)}
                selectableRows
                onSelectedRowsChange={updatedMock}
            />,
        );
        fireEvent.click(container.querySelector('input[name="select-row-0"]') as HTMLInputElement);
        fireEvent.click(container.querySelector('input[name="select-row-1"]') as HTMLInputElement);
        expect(updatedMock).toBeCalledWith({
            allSelected: true,
            selectedCount: mock.data.length + 1,
            selectedRows: mock.data,
        } as TableState<TestType>);
    });
});
describe('data prop changes', () => {
    test('should update state if the data prop changes', () => {
        const mock = dataMock();
        const { container, rerender } = render(
            <Table
                keyExtractor={(item) => String(item.id)}
                data={mock.data}
                columns={mock.columns}
            />,
        );
        rerender(
            <Table
                keyExtractor={(item) => String(item.id)}
                data={[{ id: 1, some: { name: 'Someone else' } }]}
                columns={mock.columns}
            />,
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
