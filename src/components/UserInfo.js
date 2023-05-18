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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { useSelector } from "react-redux";
import { checkFormData } from "../utils/updateUserValidation";

function UserInfo() {
  const [helperText, setHelperText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    designation: "",
  });
  const [err, setErr] = useState(false);
  const [errorVal, setErrorVal] = useState("");
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    companyName: user.companyName,
    designation: user.designation,
  });
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      //setNewUser({ ...newUser, imageUrl: e.target.result });
      // setProfilePicture(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Submit handler");

    setErr(false);
    const validationResult = checkFormData(formData, user);
    console.log(formData);
    console.log(validationResult);
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
        .put(`${base_url}/api/v1/user/update/${user._id}`, formData)
        .then((response) => {
          setFormData({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            companyName: formData.companyName,
            designation: formData.designation,
          });
        })
        .catch((error) => {
          setErr(true);
          setErrorVal(error.response.data.message);
        });
    }
  };

  const inputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box p={2}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
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
                      // src={profilePicture}
                      sx={{
                        width: "150px",
                        height: "150px",
                        margin: "2px auto 16px",
                        position: "relative",
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
                <Typography variant="h6">
                  {user?.firstName?.charAt(0).toUpperCase()}
                  {user?.firstName?.slice(1)}{" "}
                  {user?.lastName?.charAt(0).toUpperCase()}
                  {user?.lastName?.slice(1)}
                </Typography>
                <Typography variant="subtitle1">{user?.email}</Typography>
                <Typography variant="subtitle1">
                  Number of Questions posted:
                </Typography>
                <Typography variant="subtitle1">
                  Number of Answers: 5
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
                        value={formData.firstName}
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
                        value={formData.lastName}
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
                        value={formData.email}
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
                        value={formData.companyName}
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
                        value={formData.designation}
                        helperText={helperText.designation}
                        onChange={inputChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit">
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
