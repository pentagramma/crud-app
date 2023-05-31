
const initialState = {
    trigger: false,
    triggerAnswer: false,
    resetSearch:false
}

const extraReducer = (state=initialState,action)=>{
    switch(action.type){
        case "TRIGGER_QUESTION_RELOAD": return {
            ...state,
            trigger: !state.trigger
        }
        case "TRIGGER_ANSWER_RELOAD": return {
            ...state,
            triggerAnswer: !state.triggerAnswer
        }
        case "RESET_SEARCH": return {
            ...state,
            resetSearch:!state.resetSearch
        }
        default: return state
    }
}

export default extraReducer