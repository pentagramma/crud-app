import { createStore, combineReducers } from "redux";
import questionsReducer from "./Questions/questionsReducer";
import extraReducer from "./Extras/extraReducer";

const rootReducer = combineReducers({
    questions: questionsReducer,
    extras: extraReducer
})

const store = createStore(rootReducer)

export default store