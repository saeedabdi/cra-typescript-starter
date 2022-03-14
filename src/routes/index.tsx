import { createBrowserHistory } from 'history';
import React, { FunctionComponent, memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from './routes';

export const history = createBrowserHistory();
function AppRoutes() {
    return (
        <Routes>
            {routes.map((route) => {
                const Element = route.element as FunctionComponent;
                return <Route key={route.path} {...route} element={<Element />} />;
            })}

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default memo(AppRoutes);
