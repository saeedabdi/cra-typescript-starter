import { useTheme } from '@emotion/react';

import { EmotionThemeInterface } from './Theme';

function useAppTheme() {
    const theme = useTheme() as EmotionThemeInterface;
    return theme;
}

export default useAppTheme;
