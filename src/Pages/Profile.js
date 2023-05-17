import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Person, QuestionAnswer, Email } from "@mui/icons-material";
import axios from "axios";
import { base_url } from "../utils/base_url";
import UserInfo from "../components/UserInfo";
import UserQuestions from "../components/UserQuestions";
import UserAnswers from "../components/UserAnswers";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [user, setUser] = useState();
  const [section, setSection] = useState("profile");
  useEffect(() => {
    fetchUser();
  }, []);
  
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${base_url}/api/v1/user/profile`);
      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };
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
          <UserInfo user={user} />
        ) : section === "questions" ? (
          <UserQuestions user={user} />
        ) : (
          <UserAnswers />
        )}
      </Grid>

      {/* Questions */}
    </Grid>
  );
};

export default Profile;
