import React, { useState, useEffect } from "react";
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
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { base_url } from "../utils/base_url";
import axios from "axios";

const Profile = () => {
  const [section, setSection] = useState("profile");
  const [questions, setQuestions] = useState([]);
  const [images, setImages] = useState([])
  const [answers, setAnswers] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchQuestionsByUserId();
    fetchAnswersByUserId();
  }, []);

  const fetchQuestionsByUserId = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/user?userId=${user._id}`
      );
      const data = response.data;
      setQuestions(data.questions);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchAnswersByUserId = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/answers/user?userId=${user._id}`
      );
      const data = response.data;
      setAnswers(data);
    } catch (error) {
      console.error("Error fetching answers:", error);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar page={false} />
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
            <Box
              bgcolor="#f0f0f0"
              minHeight={"100%"}
              p={2}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <List sx={{ flex: "1 0 auto" }}>
                <ListItem button onClick={handleMyQuestionsClick}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="My Posts" />
                </ListItem>
                <ListItem button onClick={handleMyAnswersClick}>
                  <ListItemIcon>
                    <QuestionAnswer />
                  </ListItemIcon>
                  <ListItemText primary="My Comments" />
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
            <Box
              sx={{
                height: "85vh",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                borderLeft:"1rem solid white"
              }}
            >
              {section === "profile" ? (
                <UserInfo
                  numberOfQuestions={questions?.length}
                  numberOfAnswers={answers?.length}
                />
              ) : section === "questions" ? (
                <UserQuestions questions={questions} />
              ) : (
                <UserAnswers answers={answers} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Profile;
