import React, { useState } from 'react';
import { Grid, Box, Paper, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

function UserInfo({ user }) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [profilePicture, setProfilePicture] = useState("profile-picture.jpg");

  const handleUpdate = () => {
    // Perform update logic here
    // You can send the updated data to the server or update the state as needed
    console.log("Updated");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfilePicture(e.target.result);
    };

    reader.readAsDataURL(file);
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
                <Typography variant="h6">Username</Typography>
                <Typography variant="subtitle1">{email}</Typography>
                <Typography variant="subtitle1">
                  Number of Questions: 10
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
                  Update Details
                </Typography>
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Company Name"
                        fullWidth
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Designation"
                        fullWidth
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
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




  // <Box p={2}>
  //   <Grid container spacing={2}>
  //     <Grid item>
  //       <Avatar
  //         src="/path/to/profile-photo.jpg"
  //         alt="Profile Photo"
  //         sx={{ width: 150, height: 150 }}
  //       />
  //     </Grid>
  //     <Grid item>
  //       <Typography variant="h4">John Doe</Typography>
  //       <Typography variant="subtitle1">john.doe@example.com</Typography>

  //       {/* User Info Form */}
  //       <form>
  //         <TextField label="Name" fullWidth />
  //         <TextField label="Email" fullWidth />
  //         <TextField label="Profile Photo URL" fullWidth />
  //         <TextField label="City" fullWidth />
  //         <Button variant="contained" color="primary" type="submit">
  //           Save
  //         </Button>
  //       </form>
  //     </Grid>
  //   </Grid>
  // </Box>