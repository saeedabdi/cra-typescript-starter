import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';

import { RootStore } from '../store';

export const useRootStore = () => useContext(MobXProviderContext) as RootStore;

export { AppStores } from './app.store';
export { RootStore } from './root.store';
export { TodoStore } from './todo.store';
export { RouterStore } from 'mobx-react-router';
