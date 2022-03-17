import styled from '@emotion/styled';
import { EmotionThemeInterface } from 'styles/theme/Theme';

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
    color: ${({ theme }) => (theme as EmotionThemeInterface).colors?.accent8};
    label {
        padding-bottom: 1rem;
        font-weight: bold;
    }
    input {
        width: 100%;
        border-radius: 0.475rem;
        color: ${({ theme }) => (theme as EmotionThemeInterface).colors?.accent7};
        background: ${({ theme }) => (theme as EmotionThemeInterface).colors?.accent0};
        border: 0.1rem solid ${({ theme }) => (theme as EmotionThemeInterface).colors?.accent3};
        &:focus {
            border: 0.25rem solid ${({ theme }) => (theme as EmotionThemeInterface).colors?.blue};
        }
        &:focus {
            outline: none;
        }
        padding: 0.5rem;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    padding: 0rem 2rem;
    button {
        border: none;
        border-radius: 0.5rem;
        background: ${({ theme }) => (theme as EmotionThemeInterface).colors?.green};
        color: ${({ theme }) => (theme as EmotionThemeInterface).colors?.accent0};
        padding: 0.7rem 0.75rem;
        transition: all 0.3s ease-in;
        &:hover {
            transform: scale(1.05);
        }

        &:disabled {
            opacity: 0.5;
        }
    }
`;
