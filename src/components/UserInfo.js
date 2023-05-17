import React, { useEffect, useState } from "react";
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

function UserInfo({ user }) {
  const [newUser, setNewUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    companyName: user?.companyName || "",
    designation: user?.designation || "",
    imageUrl: user?.profilePicture || "",
  });
  const [tempUser, setTempUser] = useState();
  const [profilePicture, setProfilePicture] = useState("profile-picture.jpg");

  const handleUpdate = async () => {
    setTempUser(newUser);

    console.log(newUser);
    const response = await axios.put(
      `${base_url}/api/v1/user/update/${user._id}`,
      newUser
    );

    setNewUser({
      firstName: tempUser.firstName || "",
      lastName: tempUser.lastName || "",
      email: tempUser.email || "",
      companyName: tempUser.companyName || "",
      designation: tempUser.designation || "",
      imageUrl: tempUser.imageUrl || "",
    });
    console.log(response.data);
    console.log(profilePicture);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setNewUser({ ...newUser, imageUrl: e.target.result });
      // setProfilePicture(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => console.log(user), []);

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
                  <IconButton component="span">
                    <Avatar
                      alt="Profile Picture"
                      src={profilePicture}
                      sx={{
                        width: "150px",
                        height: "150px",
                        margin: "0 auto 16px",
                      }}
                    />
                    <PhotoCameraIcon />
                  </IconButton>
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
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        placeholder="First Name"
                        label="First Name"
                        fullWidth
                        value={newUser.firstName}
                        onChange={(e) =>
                          setNewUser({ ...newUser, firstName: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        placeholder="Last Name"
                        label="Last Name"
                        fullWidth
                        value={newUser.lastName}
                        onChange={(e) =>
                          setNewUser({ ...newUser, lastName: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Email"
                        label="Email"
                        fullWidth
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Company Name"
                        placeholder="Company Name"
                        fullWidth
                        value={newUser.companyName}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            companyName: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Designation"
                        label="Designation"
                        fullWidth
                        value={newUser.designation}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            designation: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
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

