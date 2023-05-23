import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import {
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import LoaderComponent from "../images/loader-component-gif.gif";

function LikesPopover({ anchorEl, setAnchorEl, likedUsers, popoverLoader }) {
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 2, backgroundColor: "#e5e7eb" }}>
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                mb: 1,
                backgroundColor: "white",
                borderRadius: "8px",
                color: "grey",
              }}
            >
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                LIKED BY
              </Typography>
              <Typography variant="body2">
                {`${likedUsers.length} likes`}
              </Typography>
            </Box>
            <List
              sx={{
                maxHeight: "285px",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {likedUsers.map((user) => (
                <ListItem
                  key={user._id}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    marginBottom: "5px",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={user.firstName}
                      src={user.imageUrl}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "#9c27b0",
                      }}
                    >
                      {user?.firstName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "body2",
                      sx: { fontSize: "0.875rem" },
                    }}
                    secondaryTypographyProps={{
                      variant: "body2",
                      sx: { fontSize: "0.75rem" },
                    }}
                    primary={`${user?.firstName} ${user?.lastName}`}
                    secondary={user?.email}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Popover>
  );
}

export default LikesPopover;
