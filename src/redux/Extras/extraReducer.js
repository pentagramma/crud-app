
const initialState = {
    trigger: false,
    triggerAnswer: false,
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
        default: return state
    }
}

export default extraReducer