import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import questionsReducer from "./Questions/questionsReducer";
import extraReducer from "./Extras/extraReducer";
import loginReducers from "./Login/loginReducers";

const rootReducer = combineReducers({
    questions: questionsReducer,
    extras: extraReducer,
    user:loginReducers
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store