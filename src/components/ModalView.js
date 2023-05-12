import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";

const ModalView = () => {
  return (
    <>
      <Box
        sx={{
          width: "50vw",
          height: "60vh",
          backgroundColor: "white",
          borderRadius: "10px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
          padding: "20px",
        }}
      >
        <Box
          sx={{
            color: "#9c27b0",
            bgcolor: "rgba(156,39,176,0.3)",
            width: "100%",
            height: "18vh",
            padding: "10px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
            }}
            variant="h6"
          >
            Tips on getting good answers quickly
          </Typography>
          <Typography>
            * Make sure your question has not been asked already<br/> * Keep your
            question short and to the point<br/> * Double-check grammar and spelling
          </Typography>
        </Box>
        <Box sx={{
          width:'7vw',
          marginTop:'25px'
        }}>
          <TextField color={'secondary'} label="Category" select fullWidth>
            <MenuItem value={"Technology"}>Technology</MenuItem>
            <MenuItem value={"Business"}>Business</MenuItem>
            <MenuItem value={"Philosophy"}>Philosophy</MenuItem>
          </TextField>
        </Box>
        <TextField sx={{marginTop:'10px'}} placeholder='Start your question with "What", "Why", "How", etc.' variant="outlined" color="secondary" fullWidth></TextField>
        <Button variant="contained" color="secondary" sx={{
        position:'absolute',
        right:'0',
        bottom:'0',
        marginRight:'20px',
        marginBottom:'20px'
      }}>Post</Button>
      </Box>
    </>
  );
};

export default ModalView;
