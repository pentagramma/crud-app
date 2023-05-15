
const initialState = []

const questionsReducer = (state = initialState,action)=>{
    switch(action.type){
        case "FETCH_QUESTIONS": return action.payload;
        default: return state
    }
}

export default questionsReducer