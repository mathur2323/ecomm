import {combineReducers} from 'redux';
import { categoryReducer } from './reducer.categories';
import authReducer from './reducer.auth';

const rootReducer = combineReducers({
    categories:categoryReducer,
    auth:authReducer
})

export default rootReducer;