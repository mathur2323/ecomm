import {combineReducers} from 'redux';
import { categoryReducer } from './reducer.categories';

const rootReducer = combineReducers({
    categories:categoryReducer
})

export default rootReducer;