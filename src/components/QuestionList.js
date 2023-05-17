import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "../redux/Questions/questionsActions";
import QuestionLoader from "../utils/QuestionLoader";
import axios from "axios";
import { base_url } from "../utils/base_url";
import QuestionBox from "./QuestionBox";

const QuestionList = () => {
  const questionArray = useSelector((state) => state.questions.questionArray);
  const questionReloadTrigger = useSelector((state) => state.extras.trigger);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${base_url}/api/v1/questions?skip=${1}&limit=10`)
      .then((response) => {
        dispatch(fetchQuestions(response.data.questions));
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [questionReloadTrigger]);

  return (
    <>
      {loader ? (
        <QuestionLoader />
      ) : (
        questionArray.map((each) => {
          return <QuestionBox key={each._id} each={each} />;
        })
      )}
    </>
  );
};

export default QuestionList;
