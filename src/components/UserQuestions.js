import React from "react";
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

function UserQuestions() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h2>My Questions</h2>

      {/* <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <h4>{question.question}</h4>
          </li>
        ))}
      </ul> */}
    </Box>
  );
}

export default UserQuestions;
