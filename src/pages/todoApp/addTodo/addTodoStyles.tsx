import styled from '@emotion/styled';
import { theme } from 'styles/theme';

const { colors } = theme;
export const Form = styled.form`
    width: 100%;
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: flex-end;
`;
export const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: ${colors['accent-8']};
    label {
        padding-bottom: 1rem;
        font-weight: bold;
    }
    input {
        width: 100%;
        border-radius: 0.475rem;
        background: ${colors['accent-0']};
        border: 0.1rem solid ${colors['accent-3']};
        &:focus {
            border: 0.25rem solid ${colors['blue']};
        }
        &:focus {
            outline: none;
        }
        padding: 0.5rem;
    }
`;

export const ButtonWrapper = styled.button`
    display: flex;
    padding: 0rem 2rem;
    button {
        border-radius: 0.5rem;
        background: ${colors['green']};
        color: ${colors['accent-0']};
        padding: 0.75rem 0.75rem;
        transition: all 0.3s ease-in;
        &:hover {
            transform: scale(1.05);
        }

        &:disabled {
            opacity: 0.5;
        }
    }
`;
