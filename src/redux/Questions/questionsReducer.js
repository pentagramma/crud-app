const initialState = {
  questionArray: [],
  //questions:[]
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS":
      return {
        ...state,
        questionArray: action.payload,
      };
    default:
      return state;
  }
};

export default questionsReducer;
