import * as ThemeInterface from './Theme';

export const theme: ThemeInterface.Theme = {
    colors: {
        'primary': 'var(--primary)',
        'primary-2': 'var(--primary-2)',
        'secondary': 'var(--secondary)',
        'secondary-2': 'var(--secondary-2)',
        'accent-0': 'var(--accent-0)',
        'accent-1': 'var(--accent-1)',
        'accent-1-5': 'var(--accent-1-5)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',
        'accent-5': 'var(--accent-5)',
        'accent-6': 'var(--accent-6)',
        'accent-7': 'var(--accent-7)',
        'accent-8': 'var(--accent-8)',
        'accent-9': 'var(--accent-9)',
        'green': 'var(--green)',
        'green-dark': 'var(--green-dark)',
        'red': 'var(--red)',
        'red-2': 'var(--red-2)',
        'red-dark': 'var(--red-dark)',
        'orange': 'var(--orange)',
        'orange-dark': 'var(--orange-dark)',
        'red-light': 'var(--red-light)',
        'yellow': 'var(--yellow)',
        'yellow-dark': 'var(--yellow-dark)',
        'blue': 'var(--blue)',
        'blue-dark': 'var(--blue-dark)',
    },
};
const currentTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
const htmlEl = document.getElementsByTagName('html')[0];
htmlEl.dataset.theme = currentTheme as string;
export const toggleTheme = (theme: 'light' | 'dark') => {
    htmlEl.dataset.theme = theme;
};