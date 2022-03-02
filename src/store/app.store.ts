import { makeAutoObservable } from 'mobx';
import { toggleTheme } from 'styles/theme';

type ThemeType = 'light' | 'dark';

export class AppStores {
    public ui: {
        theme: ThemeType;
    } = { theme: 'light' };

    constructor() {
        this.ui = {
            theme: (localStorage.getItem('theme') as ThemeType) ?? 'light',
        };
        makeAutoObservable(this);
    }

    public toggleTheme(theme: ThemeType) {
        localStorage.setItem('theme', theme);
        toggleTheme(theme);
        this.ui.theme = theme;
    }
}
