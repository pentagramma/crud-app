
export const fetchQuestions = (array) => {
  return {
    type: "FETCH_QUESTIONS",
    payload: array,
  };
};

export const likeQuestion = (question) => {
  return {
    type: "LIKE_QUESTION",
    payload: question,
  };
};

export const likeAnswer = (question) => {
  return { type: "LIKE_ANSWER", payload: question };
};
