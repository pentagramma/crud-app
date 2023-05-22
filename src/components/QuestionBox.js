import React, { useState, useEffect } from "react";
import { Avatar, Grid, Box, Divider, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";
import axios from "axios";
import { base_url } from "../utils/base_url";

import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

function QuestionBox({ each }) {
  const user = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    imageUrl: "https://example.com/profile-image.jpg",
    companyName: "Example Company",
    designation: "Software Engineer",
    questionsPosted: 10,
    answersPosted: 25,
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [numberOfQuestions,setNoq]=useState(0);
  const [numberOfAnswers,setNoa]=useState(0);
  const getTimeAgo = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt));
    if (distance === "less than a minute") return "Just now";
    const arr = distance.split(" ");
    if (arr.length === 2) {
      return `${arr[0]} ${arr[1]} ago`;
    }
    return `${arr[1]} ${arr[2]} ago`;
  };
  const openUser = Boolean(anchorElUser);
  const id = openUser ? "user-popover" : undefined;
  const fetchLikedUsers = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/likes/${each._id}`
      );
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
      setNoq(response.data.questions.length)
     
    } catch (error) {
      console.error("Error fetching questions:", error);
      return 0;
      
    }
  };

  const fetchAnswersByUserId = async () =>{
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/answers/user?userId=${each.postedBy._id}`
      );
      setNoa(response.data.length)
    } catch (error) {
      console.error("Error fetching answers:", error);
      return 0
    }
  }
  const userInfloClickHandler = (event) => {
    fetchQuestionsByUserId();
    fetchAnswersByUserId();
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserPopover = () => {
    setAnchorElUser(null);
  };

  const nextPageHandler = () => {
    navigate("/each-question", { state: each._id });
  };

  const handleOpenPopover = (event) => {
    fetchLikedUsers();
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  // useEffect(()=>{
    
   
  // },[])

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
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "#e5e7eb" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    mb: 1,
                    backgroundColor: "white",
                    borderRadius: "8px",
                    color: "grey",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mr: 1 }}>
                    LIKED BY
                  </Typography>
                  <Typography variant="body2">
                    {`${likedUsers.length} likes`}
                  </Typography>
                </Box>
                <List
                  sx={{
                    maxHeight: "285px",
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {likedUsers.map((user) => (
                    <ListItem
                      key={user._id}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        marginBottom: "5px",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={user.firstName}
                          src={user.imageUrl}
                          sx={{
                            cursor: "pointer",
                            backgroundColor: "#9c27b0",
                          }}
                        >
                          {user?.firstName?.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "body2",
                          sx: { fontSize: "0.875rem" },
                        }}
                        secondaryTypographyProps={{
                          variant: "body2",
                          sx: { fontSize: "0.75rem" },
                        }}
                        primary={`${user?.firstName} ${user?.lastName}`}
                        secondary={user?.email}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Popover>
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
      <Popover
        id={id}
        open={openUser}
        anchorEl={anchorElUser}
        onClose={handleCloseUserPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 3, maxWidth: 300, borderRadius: "2rem" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                alt="User Profile"
                src={each.postedBy.imageUrl}
                sx={{
                  backgroundColor: "#9c27b0",
                  width: "4.5rem",
                  height: "4.5rem",
                }}
              >
                {each.postedBy.firstName.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="body2">Questions Posted:{numberOfQuestions}</Typography>
              <Typography variant="body2">Answers Posted: {numberOfAnswers}</Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              p: 2,
              margin: 1,
              backgroundColor: "#e5e7eb",
              borderRadius: "2.5rem",
            }}
          >
            <Typography variant="h6" align="center">
              {each.postedBy.firstName} {each.postedBy.lastName}
            </Typography>
            <Typography variant="body1" align="center">
              {each.postedBy.email}
            </Typography>
            {each.postedBy.designation && (
              <Typography variant="body2" align="center">
                {each.postedBy.designation}
              </Typography>
            )}
            {each.postedBy.companyName && (
              <Typography variant="body2" align="center">
                {each.postedBy.companyName}
              </Typography>
            )}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}

export default QuestionBox;
