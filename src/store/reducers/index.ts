import { combineReducers } from 'redux';

import user from './user';

const applicationReducer = combineReducers({
    user: user,
});
const rootReducers = (state: any, action: any) => {
    return applicationReducer(state, action);
};

export default rootReducers;
