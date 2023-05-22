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
  });
  const dispatch=useDispatch();
  const [url, setUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [err, setErr] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorVal, setErrorVal] = useState("");
  const user = useSelector((state) => state.user.user);
  const [formDatas, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    companyName: user.companyName,
    designation: user.designation,
  });

  const handleProfilePictureChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const imageClickHandler = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("userId", user._id);
      const response = await axios
        .put(`${base_url}/api/v1/user/updateProfilePicture`, formData)
        .then(() => {
          setUrl(`${base_url}/${user.imageUrl}`);
        });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload image.");
    }
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
          });
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
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box p={2} sx={{ marginLeft: "12px", backgroundColor: "#f5f5f5",height:"85vh" }}>
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
                    onChange={handleProfilePictureChange}
                  />
                  <Box position="relative" display="inline-block">
                    <Avatar
                      alt="Profile Picture"
                      src={url}
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
                    </Avatar>
                  </Box>
                </label>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="small"
                  onClick={imageClickHandler}
                >
                  Upload Image
                </Button>

                <Typography variant="h6">
                  {user?.firstName?.charAt(0).toUpperCase()}
                  {user?.firstName?.slice(1)}{" "}
                  {user?.lastName?.charAt(0).toUpperCase()}
                  {user?.lastName?.slice(1)}
                </Typography>
                <Typography variant="subtitle1">{user?.email}</Typography>
                <Typography variant="subtitle1">
                  Number of Questions posted : {numberOfQuestions}
                </Typography>
                <Typography variant="subtitle1">
                  Number of Answers: {numberOfAnswers}
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
