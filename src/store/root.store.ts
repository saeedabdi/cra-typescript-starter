import { createBrowserHistory, History } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';

import * as stores from './index';

export class RootStore {
    public history: History;
    public routerStore: stores.RouterStore;
    public appStores: stores.AppStores;
    public todosStores: stores.TodoStore;

    public constructor() {
        const browserHistory = createBrowserHistory();
        this.routerStore = new stores.RouterStore();
        this.history = syncHistoryWithStore(browserHistory, this.routerStore);
        this.appStores = new stores.AppStores();
        this.todosStores = new stores.TodoStore();
    }

    public getProviderStores() {
        return {
            todosStores: this.todosStores,
            appStores: this.appStores,
            history: this.history,
        };
    }
}
