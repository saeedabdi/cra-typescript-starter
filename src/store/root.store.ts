import { createBrowserHistory, History } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';

import * as stores from './index';

export class RootStore {
    public history: History;
    public routerStore: stores.RouterStore;
    public todoStores: stores.TodoStore;

    public constructor() {
        const browserHistory = createBrowserHistory();
        this.routerStore = new stores.RouterStore();
        this.history = syncHistoryWithStore(browserHistory, this.routerStore);
        this.todoStores = new stores.TodoStore();
    }

    public getProviderStores() {
        return {
            todoStores: this.todoStores,
            history: this.history,
        };
    }
}
