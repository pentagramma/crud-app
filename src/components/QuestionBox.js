import React, { useState } from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";
import axios from "axios";
import { base_url } from "../utils/base_url";
import UserPopover from "./UserPopover";
import LikesPopover from "./LikesPopover";

function QuestionBox({ each }) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [numberOfQuestions, setNoq] = useState(0);
  const [numberOfAnswers, setNoa] = useState(0);
  const [popoverLoader, setPopoverLoader] = useState(false);

  const getTimeAgo = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt));
    if (distance === "less than a minute") return "Just now";
    const arr = distance.split(" ");
    if (arr.length === 2) {
      return `${arr[0]} ${arr[1]} ago`;
    }
    return `${arr[1]} ${arr[2]} ago`;
  };

  const fetchLikedUsers = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/likes/${each._id}`
      );
      setPopoverLoader(false);
      setLikedUsers(response.data);
    } catch (error) {
      console.error(error);
    }
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

  const userInfloClickHandler = (event) => {
    setPopoverLoader(true);
    fetchQuestionsByUserId();
    fetchAnswersByUserId();
    setAnchorElUser(event.currentTarget);
  };

  const nextPageHandler = () => {
    navigate("/each-question", { state: each._id });
  };

  const handleOpenPopover = (event) => {
    setPopoverLoader(true);
    fetchLikedUsers();
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        width: "50vw",
        height: "150px",
        backgroundColor: "white",
        display: "flex",
        gap: "10px",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          marginRight: "5px",
          width: "3vw",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            cursor: "pointer",
            backgroundColor: "#9c27b0",
          }}
          onClick={userInfloClickHandler}
        >
          {each.postedBy?.firstName?.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
      <Divider orientation="vertical" />
      <Box
        sx={{
          marginLeft: "20px",
          marginTop: "10px",
          width: "35vw",
          height: "100%",
        }}
      >
        <Typography
          sx={{
            fontWeight: "500",
            marginBottom: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            cursor: "pointer",
            "&:hover": {
              color: "#9c27b0",
              textDecoration: "underline",
            },
          }}
          variant={"h5"}
          onClick={nextPageHandler}
        >
          {each.question}
        </Typography>
        <Typography
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            color: "#aeacbb",
          }}
          variant={"h6"}
        >
          {each.gpt_answer}
        </Typography>
      </Box>
      <Divider orientation="vertical" />
      <Box
        sx={{
          width: "7vw",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <QuestionAnswerIcon />
          <Typography
            gutterBottom
            sx={{
              marginLeft: "10px",
              fontSize: "12px",
            }}
          >
            {each.answers.length}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <FavoriteIcon onClick={handleOpenPopover} />
          <Typography
            gutterBottom
            sx={{
              marginLeft: "10px",
              fontSize: "12px",
            }}
          >
            {each.likes.length}
          </Typography>
          {each.likes.length !== 0 && (
            <LikesPopover
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              likedUsers={likedUsers}
              popoverLoader={popoverLoader}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <AccessTimeFilledIcon />
          <Typography
            gutterBottom
            sx={{
              marginLeft: "8px",
              fontSize: "10px",
            }}
          >
            {getTimeAgo(each.createdAt)}
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
}

export default QuestionBox;
