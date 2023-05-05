import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  MenuItem,
  Button,
  Drawer,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Chatbot from "./Chatbot";

let arr = [
  {
    q: "how are you?",
    a: "I'm good",
  },
];
const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [resetAI, setResetAI] = useState(false);
  return (
    <>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setResetAI(false);
        }}
      >
        <Box p={2} width={"550px"} role="presentaition">
          {resetAI && <Chatbot />}
        </Box>
      </Drawer>
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
          <TextField label="Choose Category" select fullWidth>
            <MenuItem value={"Technology"}>Technology</MenuItem>
            <MenuItem value={"Business"}>Business</MenuItem>
            <MenuItem value={"Philosophy"}>Philosophy</MenuItem>
            <MenuItem value={"General Knowledge"}>Genreral Knowledge</MenuItem>
          </TextField>
        </Box>
        <Box
          width={"350px"}
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined">Post a Question</Button>
          <Button
            variant="outlined"
            onClick={() => {
              setIsDrawerOpen(true);
              setResetAI(true);
            }}
          >
            Talk to AI
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            width: "50vw",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
            }}
          >
            Questions
          </Typography>
        </Box>
        {arr.map((each) => {
          return (
            <Box
              sx={{
                width: "50vw",
                minHeight: "200px",
                backgroundColor: "#1976d2",
                color: "white",
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: "black",
                  }}
                >
                  <FaceIcon
                    sx={{
                      color: "white",
                    }}
                  />
                </Avatar>
                <Box>
                  <Typography>Bharat Chauhan</Typography>
                  <Typography> Dec, 2022</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  marginTop: "20px",
                  gap: "10px",
                }}
              >
                <QuestionAnswerIcon />
                <Typography
                  variant="h4"
                  sx={{
                    fontStyle: "italic",
                    fontWeight: "500",
                  }}
                >
                  {each.q}
                </Typography>
              </Box>
              {/* <CardContent>
                        <Typography gutterBottom variant='h5' component={'div'}>
                            {each.q}
                        </Typography>
                    </CardContent> */}
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Dashboard;
