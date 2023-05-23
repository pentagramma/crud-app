import React from "react";
import { Avatar, Grid, Box, Typography } from "@mui/material";
import { Popover } from "@mui/material";
import LoaderComponent from "../images/loader-component-gif.gif";

export default function UserPopover({
  numberOfAnswers,
  numberOfQuestions,
  each,popoverLoader,
  anchorElUser,setAnchorElUser
}) {
 
  const openUser = Boolean(anchorElUser);
  const id = openUser ? "user-popover" : undefined;
  const handleCloseUserPopover = () => {
    setAnchorElUser(null);
  };
  return (
    <Popover
      id={id}
      open={openUser}
      anchorEl={anchorElUser}
      onClose={handleCloseUserPopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ p: 3, maxWidth: 300, borderRadius: "2rem" }}>
        {popoverLoader ? (
          <Box
            sx={{
              width: "70px",
              height: "70px",
            }}
          >
            <img src={LoaderComponent} alt="loading...." />
          </Box>
        ) : (
          <>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  alt="User Profile"
                  src={each.postedBy.imageUrl}
                  sx={{
                    backgroundColor: "#9c27b0",
                    width: "4.5rem",
                    height: "4.5rem",
                  }}
                >
                  {each.postedBy.firstName.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Questions Posted:{numberOfQuestions}
                </Typography>
                <Typography variant="body2">
                  Answers Posted: {numberOfAnswers}
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                p: 2,
                margin: 1,
                backgroundColor: "#e5e7eb",
                borderRadius: "2.5rem",
              }}
            >
              <Typography variant="h6" align="center">
                {each.postedBy.firstName} {each.postedBy.lastName}
              </Typography>
              <Typography variant="body1" align="center">
                {each.postedBy.email}
              </Typography>
              {each.postedBy.designation && (
                <Typography variant="body2" align="center">
                  {each.postedBy.designation}
                </Typography>
              )}
              {each.postedBy.companyName && (
                <Typography variant="body2" align="center">
                  {each.postedBy.companyName}
                </Typography>
              )}
            </Box>
          </>
        )}
      </Box>
    </Popover>
  );
}
