import { createStore, combineReducers } from "redux";
import questionsReducer from "./Questions/questionsReducer";

const rootReducer = combineReducers({
    questions: questionsReducer,
})

const store = createStore(rootReducer)

export default store