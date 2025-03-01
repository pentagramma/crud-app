import React, { useState } from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { loginActions } from "../redux/Login/loginActions";
import AlertTitle from "@mui/material/AlertTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { useDispatch, useSelector } from "react-redux";
import { checkFormData } from "../utils/updateUserValidation";
import Cookies from "js-cookie";

function UserInfo({ numberOfQuestions, numberOfAnswers }) {
  const [helperText, setHelperText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    designation: "",
    imageUrl: "",
  });
  const dispatch = useDispatch();
  const [url, setUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [err, setErr] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorVal, setErrorVal] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [formDatas, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    companyName: user.companyName,
    designation: user.designation,
    imageUrl: user.imageUrl,
  });

  const handleProfilePictureChange = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "qandaizb");
    data.append("cloud_name", "divpq1r3o");
    fetch("https://api.cloudinary.com/v1_1/divpq1r3o/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsEdited(true);
        setFormData({ ...formDatas, imageUrl: data.url.toString() });
      });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErr(false);
    const validationResult = checkFormData(formDatas, user);
    setHelperText({
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      designation: "",
      imageUrl: "",
    });
    if (Object.keys(validationResult).length > 0) {
      setHelperText({ ...validationResult });
    } else {
      await axios
        .put(`${base_url}/api/v1/user/update/${user._id}`, formDatas)
        .then((response) => {
          setFormData({
            firstName: formDatas.firstName,
            lastName: formDatas.lastName,
            email: formDatas.email,
            companyName: formDatas.companyName,
            designation: formDatas.designation,
            imageUrl: formDatas.imageUrl,
          });
          setIsEdited(false);
        })
        .then(async () => {
          const res = await axios.get(`${base_url}/api/v1/user/profile`, {
            userId: user._id,
          });
          dispatch(loginActions(res.data.user));
          Cookies.set("user", JSON.stringify(res.data.user));

          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        })
        .catch((error) => {
          setErr(true);
          setErrorVal(error.response.data.message);
        });
    }
  };

  const inputChangeHandler = (e) => {
    setFormData({ ...formDatas, [e.target.name]: e.target.value });
    setIsEdited(true);
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box
        p={2}
        sx={{ marginLeft: "12px", backgroundColor: "#f5f5f5", height: "85vh" }}
      >
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        {showAlert && (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            <AlertTitle>Success</AlertTitle>
            Profile updated successfully.
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper>
              <Box p={2} textAlign="center">
                <label htmlFor="profile-picture-upload">
                  <input
                    type="file"
                    id="profile-picture-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (!e.target.files) return;
                      handleProfilePictureChange(e.target.files[0]);
                    }}
                  />
                  <Box position="relative" display="inline-block">
                    <Avatar
                      alt="Profile Picture"
                      src={formDatas.imageUrl}
                      sx={{
                        width: "150px",
                        height: "150px",
                        margin: "2px auto 16px",
                        right: "8px",
                        position: "relative",
                        backgroundColor: "#9c27b0",
                      }}
                      avatarStyle={{
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {user.firstName?.charAt(0).toUpperCase()}
                    </Avatar>
                    <IconButton
                      component="span"
                      sx={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        backgroundColor: "white",
                      }}
                    >
                      <PhotoCameraIcon
                        sx={{
                          marginBottom: "5px",
                        }}
                      />
                    </IconButton>
                  </Box>
                </label>

                <Typography variant="h6">
                  {user?.firstName?.charAt(0).toUpperCase()}
                  {user?.firstName?.slice(1)}{" "}
                  {user?.lastName?.charAt(0).toUpperCase()}
                  {user?.lastName?.slice(1)}
                </Typography>
                <Typography variant="subtitle1">{user?.email}</Typography>
                <Typography variant="subtitle1">
                  Number of Posts : {numberOfQuestions}
                </Typography>
                <Typography variant="subtitle1">
                  Number of Comments: {numberOfAnswers}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  Update Your Details
                </Typography>
                <form onSubmit={onSubmitHandler}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        placeholder="First Name"
                        label="First Name"
                        fullWidth
                        name="firstName"
                        value={formDatas.firstName}
                        onChange={inputChangeHandler}
                        helperText={helperText.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        placeholder="Last Name"
                        label="Last Name"
                        fullWidth
                        name="lastName"
                        value={formDatas.lastName}
                        onChange={inputChangeHandler}
                        helperText={helperText.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Email"
                        label="Email"
                        fullWidth
                        name="email"
                        value={formDatas.email}
                        onChange={inputChangeHandler}
                        helperText={helperText.email}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Company Name"
                        placeholder="Company Name"
                        fullWidth
                        name="companyName"
                        value={formDatas.companyName}
                        onChange={inputChangeHandler}
                        helperText={helperText.companyName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Designation"
                        label="Designation"
                        fullWidth
                        name="designation"
                        value={formDatas.designation}
                        helperText={helperText.designation}
                        onChange={inputChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        disabled={!isEdited}
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default UserInfo;
