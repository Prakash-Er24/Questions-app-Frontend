import {createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import questionReducer from '../reducer/questionReducer'
import studentReducer from '../reducer/studentReducer'
import userReducer from '../reducer/userReducer'


const configureStore = () => {
    const store = createStore(combineReducers({
        questions : questionReducer,
        students : studentReducer,
        user : userReducer
    }),applyMiddleware(thunk))
    return store 
}

export default configureStore