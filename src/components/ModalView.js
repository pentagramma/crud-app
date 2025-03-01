import { Box, Button, MenuItem, TextField, Typography, IconButton } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
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
    imageUrl: ""
  });
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageError, setImageError] = useState("");
  const dispatch = useDispatch();
  const changeCategoryHandler = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };
  const changeQuestionHandler = (e) => {
    setFormData({ ...formData, question: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
  
    if (previewUrl) {
      setLoader(true);
      const dataToSend = {
        question: formData.question || "",
        image: previewUrl,
        category: formData.category || ""
      };
      try {
        const response = await axios.post(`${base_url}/api/v1/questions`, dataToSend);
        console.log("Response:", response.data);
        setLoader(false);
        dispatch(triggerQuestionReload());
        setIsModalOpen(false);
        navigate('/');
      } catch (error) {
        console.error("Error submitting question:", error.response ? error.response.data : error.message);
        setLoader(false);
        alert("An error occurred while submitting your question. Please try again.");
      }
    } else {
      setImageError("Image is required");
      console.log("Image is required");
    }
  };

const handleImageUpload = (event) => {
  console.log("Image upload triggered"); // Debug log
  const file = event.target.files[0];
  setSelectedImage(file);

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setImageError(""); 
      console.log("Image preview set"); // Debug log
    };
    reader.readAsDataURL(file);
  } else {
    setPreviewUrl(null);
    setImageError("Image is required");
  }
};

const handleDeleteQuestion = async (event) => {
  event.stopPropagation();
  if (window.confirm('Are you sure you want to delete this question?')) {
    try {
      await axios.delete(`\${base_url}/api/v1/questions/\${each._id}`);
      dispatch(triggerQuestionReload());
      navigate('/'); // or wherever you want to redirect after deletion
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("An error occurred while deleting the question. Please try again.");
    }
  }
};

return (
    <>
      {loader ? (
        <Box
          sx={{
            width: "60vw",
            height: "80vh",
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
            width: "60vw",
            height: "80vh",
            backgroundColor: "white",
            borderRadius: "10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Box
            sx={{
              color: "#9c27b0",
              bgcolor: "rgba(156,39,176,0.3)",
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            <Typography sx={{ fontWeight: "600" }} variant="h6">
              Tips on getting good answers quickly
            </Typography>
            <Typography>
              * Make sure your question has not been asked already
              <br /> * Keep your question short and to the point
              <br /> * Double-check grammar and spelling
            </Typography>
          </Box> */}

          <Box sx={{ flex: 1, overflowY: "auto", paddingRight: "10px" }}>
            <TextField
              color={"secondary"}
              label="Hashtags"
              select
              fullWidth
              value={formData.category}
              onChange={changeCategoryHandler}
              sx={{ marginBottom: "15px" }}
            >
              <MenuItem value={"Technology"}>Technology</MenuItem>
              <MenuItem value={"Business"}>Business</MenuItem>
              <MenuItem value={"Philosophy"}>Philosophy</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </TextField>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="icon-button-file"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="icon-button-file">
                  <IconButton color="secondary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {selectedImage ? selectedImage.name : 'Upload an image'}
                </Typography>
              </Box>
              {imageError && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {imageError}
                </Typography>
              )}
              {previewUrl && (
                <Box
                  sx={{
                    mt: 2,
                    width: '100%',
                    maxHeight: '300px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              )}
            </Box>

            <TextField
              multiline={true}
              rows={4}
              value={formData.question}
              onChange={changeQuestionHandler}
              sx={{ marginTop: "10px" }}
              placeholder='Caption goes here...'
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{
              alignSelf: "flex-end",
              marginTop: "20px",
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
