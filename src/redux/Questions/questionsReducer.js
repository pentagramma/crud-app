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
    case "LIKE_QUESTION":
    case "LIKE_ANSWER":
      const updatedQuestions = state.questionArray.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        }
        return question;
      });

      return {
        ...state,
        questionArray: updatedQuestions,
      };
    default:
      return state;
  }
};

export default questionsReducer;
