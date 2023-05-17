
const initialState = {
    trigger: false
}

const extraReducer = (state=initialState,action)=>{
    switch(action.type){
        case "TRIGGER_QUESTION_RELOAD": return {
            trigger: !state.trigger
        }
        default: return state
    }
}

export default extraReducer