import React, { useState } from "react";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Person, QuestionAnswer, Email } from "@mui/icons-material";
import UserInfo from "../components/UserInfo";
import UserQuestions from "../components/UserQuestions";
import UserAnswers from "../components/UserAnswers";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [section, setSection] = useState("profile");

  const handleMyQuestionsClick = async () => {
    setSection("questions");
  };

  const handleMyAnswersClick = async () => {
    setSection("answers");
  };

  const handleMyProfileClick = async () => {
    setSection("profile");
  };
  return (
    <Grid container>
      <Navbar />
      <Grid item xs={2}>
        <Box bgcolor="#f0f0f0" minHeight="100vh" p={2}>
          <List>
            <ListItem button onClick={handleMyQuestionsClick}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="My Questions" />
            </ListItem>
            <ListItem button onClick={handleMyAnswersClick}>
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText primary="My Answers" />
            </ListItem>
            <ListItem button onClick={handleMyProfileClick}>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary="Profile Info" />
            </ListItem>
          </List>
        </Box>
      </Grid>
      <Grid item xs={10}>
        {section === "profile" ? (
          <UserInfo />
        ) : section === "questions" ? (
          <UserQuestions />
        ) : (
          <UserAnswers />
        )}
      </Grid>
    </Grid>
  );
};

export default Profile;
