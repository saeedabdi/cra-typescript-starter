import 'assets/styles/index.css';

import { ThemeProvider } from '@emotion/react';
import AppRoutes from 'routes';
import { theme } from 'styles/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppRoutes />
        </ThemeProvider>
    );
}

export default App;
