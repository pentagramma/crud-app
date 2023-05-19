
export const fetchQuestions = (array) => {
  return {
    type: "FETCH_QUESTIONS",
    payload: array,
  };
};
