import React, { useState } from "react";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Person, QuestionAnswer, Email, FoodBank } from "@mui/icons-material";
import UserInfo from "../components/UserInfo";
import UserQuestions from "../components/UserQuestions";
import UserAnswers from "../components/UserAnswers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  >
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: "1 0 auto",
          overflowY: "auto",
           padding: "20px",
        }}
      >
        <Grid container>
          <Grid item xs={2}>
            <Box bgcolor="#f0f0f0" minHeight={'100%'} p={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              <List sx={{ flex: '1 0 auto' }}>
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
      </Box>
      <Footer />
    </Box>
  );
};

export default Profile;
