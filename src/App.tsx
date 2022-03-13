// import 'assets/styles/index.css';

import { css, Global, ThemeProvider } from '@emotion/react';
import PoppinsFont from 'assets/fonts/Poppins/Poppins-Regular.ttf';
import { ThemeContext } from 'context/themeContext';
import { useState } from 'react';
import AppRoutes from 'routes';
import { theme as EmotionTheme } from 'styles/theme';
import { ThemeInterface } from 'styles/theme/Theme';

function App() {
    const [theme, setTheme] = useState<keyof ThemeInterface['colors']>(
        (localStorage.getItem('theme') as keyof ThemeInterface['colors']) || 'light',
    );
    function toggleTheme() {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }
    return (
        <>
            <Global
                styles={css`
                    @font-face {
                        font-family: Poppins;
                        font-style: normal;
                        font-weight: normal;
                        src: url(${PoppinsFont});
                    }
                    html,
                    body {
                        width: 100%;
                        height: 100%;
                        min-height: 100%;
                        font-family: Poppins;
                        margin: 0;
                    }
                `}
            />
            <ThemeProvider theme={{ colors: EmotionTheme['colors'][theme] }}>
                <ThemeContext.Provider
                    value={{
                        theme,
                        toggleTheme,
                    }}
                >
                    <AppRoutes />
                </ThemeContext.Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
