import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import { Box, TextField, MenuItem } from "@mui/material";
import QuestionList from "./QuestionList";

const Dashboard = () => {
  return (
    <Box
      bgcolor={"#ecf0f1"}
      sx={{
        bottom: "0",
        top: "0",
        position: "absolute",
        overflow:'hidden'
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          minHeight: "100px",
          width: "100vw",
          padding: "25px",
          justifyContent: "space-between",
        }}
      >
        <Box width={"250px"}>
          <TextField color={'secondary'} label="Choose Category" select fullWidth>
            <MenuItem value={"Technology"}>Technology</MenuItem>
            <MenuItem value={"Business"}>Business</MenuItem>
            <MenuItem value={"Philosophy"}>Philosophy</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </TextField>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "20px",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          display:'flex',
          flexDirection:'column',
          marginLeft:'25vw',
          height: '70vh'
        }}
      >
        <QuestionList />
      </Box>
    </Box>
  );
};

export default Dashboard;