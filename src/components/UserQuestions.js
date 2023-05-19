import React, { useEffect, useState } from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";

function UserQuestions({ questions }) {
  const user = useSelector((state) => state.user.user);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (questions.length > 0) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, []);

  const getTimeAgo = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt));
    if (distance == "less than a minute") return "Just now";
    const arr = distance.split(" ");
    if (arr.length === 2) {
      return `${arr[0]} ${arr[1]} ago`;
    }
    return `${arr[1]} ${arr[2]} ago`;
  };

  return !flag ? (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "4px",
        marginLeft: "3%",
      }}
    >
      <Typography variant="h5" align="center">
        Oops!! No Questions Posted yet!!
      </Typography>
    </Box>
  ) : (
    <Box component="main" sx={{ flexGrow: 1, p: 3, m: 7 }}>
      {questions.map((question) => (
        <Box
          key={question._id}
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
              {user?.firstName.slice(0, 1)}
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
            >
              {question.question}
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
              {question.gpt_answer}
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
                {question.ans_count}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <FavoriteIcon />
              <Typography
                gutterBottom
                sx={{
                  marginLeft: "10px",
                  fontSize: "12px",
                }}
              >
                {question.likes?.length}
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
                {getTimeAgo(question.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default UserQuestions;
