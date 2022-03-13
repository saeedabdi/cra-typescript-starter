import { useTheme } from '@emotion/react';

import { EmotionThemeInterface } from './Theme';

const useAppTheme = () => {
    const theme = useTheme() as EmotionThemeInterface;
    return theme;
};

export default useAppTheme;
