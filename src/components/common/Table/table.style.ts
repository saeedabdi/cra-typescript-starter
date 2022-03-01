import styled from '@emotion/styled';
import { theme } from 'styles/theme';

export const Table = styled.table`
    position: relative;
    width: 100%;
`;
export const Thead = styled.th`
    padding: 1rem 0rem 0.5rem 0rem;
    white-space: nowrap;
    div {
        padding: 0rem 0, 5rem;
        input {
            width: 1.25rem;
            height: 1.25rem;
        }
    }
`;
export const Td = styled.th`
    padding: 1rem 0rem 0.5rem 0rem;
    white-space: nowrap;
    div {
        color: ${theme?.colors?.['accent-8']};
        padding: 0rem 0.5rem;
    }
`;
export const LoadingComponentsWrapper = styled.td`
    width: 100%;
    height: 16rem;
    color: ${theme?.colors?.['accent-8']};
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const EmptyComponentsWrapper = styled.td`
    width: 100%;
    height: 16rem;
    color: ${theme?.colors?.['accent-8']};
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const TableCell = styled.td`
    height: inherit;
    padding: 0;
    color: ${theme?.colors?.['accent-8']};
    div {
        padding: 0.25rem 0rem;
        height: 100%;
    }
`;
