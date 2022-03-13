import React from 'react';
import { ThemeInterface } from 'styles/theme/Theme';

export const ThemeContext = React.createContext<{
    theme: string;
    toggleTheme: VoidFunction;
}>({
    theme: (localStorage.getItem('theme') || 'light') as keyof ThemeInterface['colors'],
    toggleTheme: () => {
        return {};
    },
});
