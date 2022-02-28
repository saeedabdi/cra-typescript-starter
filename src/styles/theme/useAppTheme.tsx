import { useTheme } from '@emotion/react';

import { Theme } from './Theme';

const useAppTheme = () => {
    const theme = useTheme() as Theme;

    return theme;
};

export default useAppTheme;
