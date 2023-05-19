import axios from "axios";
import { base_url } from "../../utils/base_url";

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
// return async (dispatch) => {
//   try {
//     const response = await axios.post(`${base_url}/api/v1/questions/${questionId}/like`);
//     console.log(response.data)
//     const updatedQuestion = response.data;
//     dispatch({ type: "LIKE_QUESTION", payload: updatedQuestion });
//   } catch (error) {
//     console.error("Error liking question:", error);
//   }
// };

// export const likeAnswer = (questionId, answerId) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         `${base_url}/api/v1/questions/${questionId}/answers/${answerId}/like`
//       );
//       const updatedQuestion = response.data;
//       dispatch({ type: "LIKE_ANSWER", payload: updatedQuestion });
//     } catch (error) {
//       console.error("Error liking answer:", error);
//     }
//   };
// };
