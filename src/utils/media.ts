import { css } from '@emotion/react';

export const mobile = (inner: string) => css`
    @media (max-width: ${1000 / 16}em) {
        ${inner};
    }
`;

export const phone = (inner: string) => css`
    @media (max-width: ${650 / 16}em) {
        ${inner};
    }
`;
