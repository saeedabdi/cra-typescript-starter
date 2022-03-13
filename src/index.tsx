import { BrowserRouter } from 'components/common';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { RootStore } from 'store';

import App from './App';
import reportWebVitals from './reportWebVitals';

configure({
    enforceActions: 'observed',
});
const rootStore = new RootStore();
export const { history } = rootStore.getProviderStores();
ReactDOM.render(
    <React.StrictMode>
        <Provider {...rootStore.getProviderStores()}>
            <BrowserRouter history={history}>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
