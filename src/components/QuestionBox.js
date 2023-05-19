import React, { useEffect } from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { likeAnswer, likeQuestion } from "../redux/Questions/questionsActions";
import axios from "axios";
import { base_url } from "../utils/base_url";

function QuestionBox({ each }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const getTimeAgo = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt));
    if (distance == "less than a minute") return "Just now";
    const arr = distance.split(" ");
    if (arr.length === 2) {
      return `${arr[0]} ${arr[1]} ago`;
    }
    return `${arr[1]} ${arr[2]} ago`;
  };

  const handleLikeQuestion = async () => {
    const response = await axios.post(
      `${base_url}/api/v1/questions/${each._id}/like`,
      {
        userId: user._id,
      }
    );
    console.log(response.data);
    dispatch(likeQuestion(response.data));
  };

 
  const nextPageHandler = () => {
    navigate("/each-question", { state: each._id });
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
          <FavoriteIcon onClick={handleLikeQuestion} />
          <Typography
            gutterBottom
            sx={{
              marginLeft: "10px",
              fontSize: "12px",
            }}
          >
            {each.likes?.length}
          </Typography>
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
    </Box>
  );
}

export default QuestionBox;
