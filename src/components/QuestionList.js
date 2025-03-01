import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "../redux/Questions/questionsActions";
import QuestionLoader from "../utils/QuestionLoader";
import axios from "axios";
import { base_url } from "../utils/base_url";
import QuestionBox from "./QuestionBox";

const QuestionList = ({page, setPageCount, category}) => {
  const questionReloadTrigger = useSelector((state) => state.extras.trigger);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${base_url}/api/v1/questions?skip=${page}&limit=10&category=${category !== "" ? category : ""}`)
      .then((response) => {
        const total = response.data.totalCount;
        if(total <= 10){
          setPageCount(1);
        } else {
          setPageCount(Math.ceil(total/10));
        }
        setQuestions(response.data.questions);
        dispatch(fetchQuestions(response.data.questions));
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  }, [questionReloadTrigger, page, category]);

  const handleQuestionDelete = (deletedQuestionId) => {
    setQuestions(prevQuestions => prevQuestions.filter(question => question._id !== deletedQuestionId));
  };

  return (
    <>
      {loader ? (
        <QuestionLoader />
      ) : (
        questions.map((each) => {
          return <QuestionBox key={each._id} each={each} onQuestionDelete={handleQuestionDelete} />;
        })
      )}
    </>
  );
};

export default QuestionList;