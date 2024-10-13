import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { thunk } from 'redux-thunk';
import VSAchieveReducer from '../reducer/VSAchieveReducer';
import CompanyDetailsReducer from '../reducer/CompanyDetailsReducer';

const reducer = combineReducers({
    VSAchieveReducer: VSAchieveReducer,
    CompanyDetailsReducer: CompanyDetailsReducer
})

const store = createStore(reducer, applyMiddleware(thunk));
console.log(store.getState());
export default store;