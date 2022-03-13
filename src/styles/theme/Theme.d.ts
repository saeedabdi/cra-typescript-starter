export interface ThemeInterface {
    colors: {
        dark: {
            primary: string;
            'primary2': string;
            secondary: string;
            'secondary2': string;
            'accent0': string;
            'accent1': string;
            'accent1_5': string;
            'accent2': string;
            'accent3': string;
            'accent4': string;
            'accent5': string;
            'accent6': string;
            'accent7': string;
            'accent8': string;
            'accent9': string;
            green: string;
            'greenDark': string;
            red: string;
            'red2': string;
            'redDark': string;
            orange: string;
            'orangeDark': string;
            'redLight': string;
            yellow: string;
            'yellowDark': string;
            blue: string;
            'blueDark': string;
        };
        light: {
            primary: string;
            'primary2': string;
            secondary: string;
            'secondary2': string;
            'accent0': string;
            'accent1': string;
            'accent1_5': string;
            'accent2': string;
            'accent3': string;
            'accent4': string;
            'accent5': string;
            'accent6': string;
            'accent7': string;
            'accent8': string;
            'accent9': string;
            green: string;
            'greenDark': string;
            red: string;
            'red2': string;
            'redDark': string;
            orange: string;
            'orangeDark': string;
            'redLight': string;
            yellow: string;
            'yellowDark': string;
            blue: string;
            'blueDark': string;
        };
    };
}
export interface EmotionThemeInterface {
    colors: ThemeInterface['colors']['light'];
}
