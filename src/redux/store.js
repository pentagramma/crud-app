import { createStore, combineReducers } from "redux";
import questionsReducer from "./Questions/questionsReducer";
import extraReducer from "./Extras/extraReducer";
import loginReducers from "./Login/loginReducers";

const rootReducer = combineReducers({
    questions: questionsReducer,
    extras: extraReducer,
    user:loginReducers
})

const store = createStore(rootReducer)

export default store