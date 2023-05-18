import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { base_url } from "../utils/base_url";
import { useDispatch } from "react-redux";
import { triggerQuestionReload } from "../redux/Extras/extraActions";
import LoadingImage from "../images/loading-gif.gif";
import { useNavigate } from "react-router";

const ModalView = ({ setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    category: "",
    question: "",
  });
  const [helperText, setHelperText] = useState({
    category: "",
    question: "",
  });
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const changeCategoryHandler = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };
  const changeQuestionHandler = (e) => {
    setFormData({ ...formData, question: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.category !== "" && formData.question !== "") {
      setLoader(true);
      axios
        .post(`${base_url}/api/v1/questions`, formData)
        .then((response) => {
          setLoader(false);
          dispatch(triggerQuestionReload());
          setIsModalOpen(false);
          navigate('/')
        })
        .catch((error) => {
          console.log(error);
          setLoader(false)
        });
    } else {
      if(formData.category === "" && formData.question === ""){
        setHelperText({question:"Required field",category:"Required field"})
      }
      else if(formData.question === ""){
        setHelperText({category:"",question:"Required field"})
      }
      else if(formData.category === ""){
        setHelperText({question:"",category:"Required field"})
      }
    }
  };
  return (
    <>
      {loader ? (
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box width={"150px"} height={"150px"}>
            <img src={LoadingImage} alt="loading-data" />
          </Box>
        </Box>
      ) : (
        <Box
          component={"form"}
          onSubmit={handleSubmit}
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
              * Make sure your question has not been asked already
              <br /> * Keep your question short and to the point
              <br /> * Double-check grammar and spelling
            </Typography>
          </Box>
          <Box
            sx={{
              width: "10vw",
              marginTop: "15px",
            }}
          >
            <TextField
              color={"secondary"}
              label="Category"
              select
              fullWidth
              value={formData.category}
              onChange={changeCategoryHandler}
              helperText={helperText.category}
            >
              <MenuItem value={"Technology"}>Technology</MenuItem>
              <MenuItem value={"Business"}>Business</MenuItem>
              <MenuItem value={"Philosophy"}>Philosophy</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </TextField>
          </Box>
          <TextField
            multiline={true}
            rows={3}
            value={formData.question}
            onChange={changeQuestionHandler}
            sx={{ marginTop: "10px" }}
            placeholder='Start your question with "What", "Why", "How", etc.'
            variant="outlined"
            color="secondary"
            fullWidth
            helperText={helperText.question}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{
              position: "absolute",
              right: "0",
              bottom: "0",
              marginRight: "20px",
              marginBottom: "20px",
            }}
          >
            Post
          </Button>
        </Box>
      )}
    </>
  );
};

export default ModalView;
