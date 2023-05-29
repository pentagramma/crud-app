import { Box, Avatar, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../redux/Login/loginActions";
import axios from "axios";
import { base_url } from "../utils/base_url";
import UserPopover from "../components/UserPopover";
import Cookies from "js-cookie";

const EachAnswer = ({ each, questionData }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [like, setLike] = useState(0);
  const [checkLike, setCheckLike] = useState(false);
  const [numberOfQuestions, setNoq] = useState(0);
  const [numberOfAnswers, setNoa] = useState(0);
  const [popoverLoader, setPopoverLoader] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    let answer = questionData.answers.filter((x) => x._id === each._id)[0];
    setLike(answer.likes.length);
    if (user?.likedAnswers?.includes(each._id)) {
      setCheckLike(true);
    } else {
      setCheckLike(false);
    }
  }, []);

  const handleLikeAnswer = async () => {
    const response = await axios.post(
      `${base_url}/api/v1/questions/${questionData._id}/answers/${each._id}/like`,
      {
        userId: user._id,
      }
    );
    dispatch(loginActions(response.data.user));
    Cookies.set("user", JSON.stringify(response.data.user));
    let answer = response.data.question.answers.filter(
      (x) => x._id === each._id
    )[0];
    setLike(answer.likes.length);
    if (answer.likes.includes(user._id)) {
      setCheckLike(true);
    } else {
      setCheckLike(false);
    }
  };

  const userInfloClickHandler = (event) => {
    setPopoverLoader(true);
    fetchQuestionsByUserId();
    fetchAnswersByUserId();
    setAnchorElUser(event.currentTarget);
  };

  const fetchQuestionsByUserId = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/user?userId=${each.postedBy._id}`
      );
      setNoq(response.data.questions.length);
    } catch (error) {
      console.error("Error fetching questions:", error);
      return 0;
    }
  };

  const fetchAnswersByUserId = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/answers/user?userId=${each.postedBy._id}`
      );
      setPopoverLoader(false);
      setNoa(response.data.length);
    } catch (error) {
      console.error("Error fetching answers:", error);
      return 0;
    }
  };

  return (
    <Box
      sx={{
        width: "50vw",
        height: "fit-content",
        backgroundColor: "white",
        gap: "10px",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            marginRight: "5px",
            marginTop: "10px",
            width: "3vw",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={each.postedBy.imageUrl}
            sx={{
              cursor: "pointer",
              backgroundColor: "#9c27b0",
            }}
            onClick={userInfloClickHandler}
          >
            {each.postedBy.firstName?.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
        <Box
          sx={{
            marginLeft: "20px",
            marginTop: "10px",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontWeight: "550",
              marginBottom: "10px",
            }}
            variant={"h5"}
          >
            {each.postedBy.firstName} says...
          </Typography>
          <Typography
            sx={{
              fontWeight: "500",
              marginBottom: "10px",
            }}
            variant={"h6"}
          >
            {each.answer}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          height: "7vh",
          backgroundColor: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              marginRight: "30px",
              height: "100%",
              alignItems: "center",
            }}
          >
            {checkLike ? (
              <ThumbUpAltIcon
                sx={{
                  cursor: "pointer",
                  color: "#9c27b0",
                }}
                onClick={handleLikeAnswer}
              />
            ) : (
              <ThumbUpOffAltIcon
                sx={{
                  cursor: "pointer",
                  color: "#9c27b0",
                }}
                onClick={handleLikeAnswer}
              />
            )}
            <Typography
              sx={{
                marginLeft: "10px",
                fontSize: "12px",
                color: "#9c27b0",
              }}
            >
              {like}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <AccessTimeFilledIcon />
          <Typography
            sx={{
              marginLeft: "10px",
              fontSize: "12px",
            }}
          >
            {each.timestamp}
          </Typography>
        </Box>
      </Box>
      <UserPopover
        numberOfAnswers={numberOfAnswers}
        numberOfQuestions={numberOfQuestions}
        each={each}
        popoverLoader={popoverLoader}
        anchorElUser={anchorElUser}
        setAnchorElUser={setAnchorElUser}
      />
    </Box>
  );
};

export default EachAnswer;
