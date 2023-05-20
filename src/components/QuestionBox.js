import React, { useState, useEffect } from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
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
      setLikedUsers(response.data);
    } catch (error) {
      console.error(error);
    }
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
