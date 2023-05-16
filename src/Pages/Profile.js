import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Button,
} from "@mui/material";
import { Person, QuestionAnswer, Email } from "@mui/icons-material";
import axios from "axios";
import { base_url } from "../utils/base_url";
import UserInfo from "../components/UserInfo";
import UserQuestions from "../components/UserQuestions";
import UserAnswers from "../components/UserAnswers";
import Navbar from "../components/Navbar"

const Profile = () => {
  const [questions, setQuestions] = useState([]);
  const [user,setUser]=useState();
  const [section, setSection] = useState("profile");
  useEffect(async()=>{
    const response = await axios.get(`${base_url}/api/v1/user/profile`);
    setUser(response.data.user)
  },[])
  const handleMyQuestionsClick = async (email) => {
    setSection("questions");
    try {
      console.log("inquestions page");
      const response = await axios.get(`${base_url}/api/v1/questions`, {
        params: {
          userId: user._id,
        },
      });
    
      console.log(response.data);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("An error occurred while fetching user questions:", error);
    }
  };

  const handleMyAnswersClick = async (email) => {
    setSection("answers");
  };

  const handleMyProfileClick = async () => {
    setSection("profile");
  };
  return (
    <Grid container>
      <Navbar />
      <Grid item xs={3}>
        <Box bgcolor="#f0f0f0" minHeight="100vh" p={2}>
          <List>
            <ListItem
              button
              onClick={() => handleMyQuestionsClick("abc1235@gmail.com")}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="My Questions" />
            </ListItem>
            <ListItem button onClick={() => handleMyAnswersClick("")}>
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText primary="My Answers" />
            </ListItem>
            <ListItem button onClick={() => handleMyProfileClick()}>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary="Profile Info" />
            </ListItem>
          </List>
        </Box>
      </Grid>
      <Grid item xs={9}>
        {section === "profile" ? (
          <UserInfo user={user}/>
        ) : section === "questions" ? (
          <UserQuestions />
        ) : (
          <UserAnswers />
        )}
      </Grid>

      {/* Questions */}
    </Grid>
  );
};

export default Profile;
