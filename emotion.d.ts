import '@emotion/react';

import { EmotionThemeInterface } from './src/styles/theme/Theme.d';

declare module '@emotion/react' {
    export interface Theme {
        colors: EmotionThemeInterface['colors'];
    }
}
