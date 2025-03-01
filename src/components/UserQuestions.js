import React, { useEffect, useState } from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserQuestions({ questions }) {
  const user = useSelector((state) => state.user.user);
  const navigate=useNavigate()
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
  const nextPageHandler = (questionId) => {
    navigate("/each-question", { state: questionId });
  };

  useEffect(() => {
    console.log(questions);
  },[questions])

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
    <Box component="main" sx={{ flexGrow: 1, p: 3, m: 7, }}>
      {questions.map((question) => (
        <Box
          key={question._id}
          sx={{
            width: "50vw",
            minHeight: "150px", // Changed from fixed height to minHeight
            backgroundColor: "white",
            display: "flex",
            gap: "10px",
            padding: "10px",
            marginBottom: "20px", // This adds space between question boxes
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Optional: adds a subtle shadow
            borderRadius: "8px", // Optional: rounds the corners
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
              src={user?.imageUrl}
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
              display: "flex",
              flexDirection: "column",
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
              onClick={() => nextPageHandler(question._id)}
              variant={"h5"}
            >
              {question.question}
            </Typography>
            {question.imageUrl && (
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "200px",
                  overflow: "hidden",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={question.imageUrl}
                  alt="image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
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
                {question.answers.length}
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
