import styled from '@emotion/styled';
import { EmotionThemeInterface } from 'styles/theme/Theme';

export const Table = styled.table`
    position: relative;
    width: 100%;
`;
export const CheckBoxWrapper = styled.td`
    padding: 1rem 0rem 0.5rem 0rem;
    white-space: nowrap;
    label {
        width: 100%;
        display: flex;
        justify-content: center;
        input {
            width: 1.25rem;
            height: 1.25rem;
        }
    }
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
export const Th = styled.th`
    padding: 1rem 0rem 0.5rem 0rem;
    white-space: nowrap;
    div {
        color: ${({ theme }) => (theme as EmotionThemeInterface).colors?.accent8};
        padding: 0rem 0.5rem;
    }
`;
export const LoadingComponentsWrapper = styled.div`
    width: 100%;
    height: 16rem;
    color: ${({ theme }) => (theme as EmotionThemeInterface).colors?.accent8};
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const EmptyComponentsWrapper = styled.div`
    width: 100%;
    height: 16rem;
    color: ${({ theme }) => (theme as EmotionThemeInterface).colors?.accent8};
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const TableCell = styled.td`
    height: inherit;
    padding: 0;
    color: ${({ theme }) => (theme as EmotionThemeInterface).colors?.accent8};
    div {
        div {
            padding: 0.25rem 0rem;
            height: 100%;
            justify-content: center;
            align-items: center;
        }
    }
`;
