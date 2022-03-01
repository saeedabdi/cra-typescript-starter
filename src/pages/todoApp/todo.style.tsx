import styled from '@emotion/styled';
import { theme } from 'styles/theme';
import { mobile } from 'utils/media';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 4rem 16rem;
    min-height: 100vh;
    ${mobile(`
        padding: 1rem ; 
        `)};
    background: ${theme?.colors?.['accent-0']};
`;
export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0rem;
    div {
        display: flex;
        .deleteButton {
            border-radius: 0.25rem;
            padding: 0.5rem 0.75rem;
            margin: 0rem 0.2rem;
            transition: all 0.3s ease-in;
            &:hover {
                transform: scale(1.1);
            }
            background: ${theme?.colors?.red};
            color: ${theme?.colors?.['accent-0']};
        }
        .doneButton {
            border-radius: 0.25rem;
            margin: 0rem 0.2rem;
            padding: 0.5rem 0.75rem;
            transition: all 0.3s ease-in;
            &:hover {
                transform: scale(1.1);
            }
            background: ${theme?.colors?.green};
            color: ${theme?.colors?.['accent-0']};
        }
        .unDoneButton {
            padding: 0.5rem 0.75rem;
            border-radius: 0.25rem;
            margin: 0rem 0.2rem;
            transition: all 0.3s ease-in;
            &:hover {
                transform: scale(1.1);
            }
            background: ${theme?.colors?.blue};
            color: ${theme?.colors?.['accent-0']};
        }
    }
`;
export const ToggleThemeButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    button {
        padding: 0.5rem 1rem;
        color: ${theme.colors['accent-0']};
        background: ${theme.colors['accent-8']};
        border-radius: 0.25rem;
        transition: all 0.3s ease-in;
        padding: 0.5rem 1rem;
        &:hover {
            transform: scale(1.05);
        }
    }
`;
