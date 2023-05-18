import React, { useEffect } from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Drawer,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Modal
} from "@mui/material";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import SearchIcon from "@mui/icons-material/Search";
import Chatbot from "./Chatbot";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ModalView from "./ModalView";
import { useSelector } from 'react-redux';

const Navbar = ({page}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [resetAI, setResetAI] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false)
  const user = useSelector((state) => state.user);
  const [letter,setLetter]=useState('U')
  const navigate = useNavigate()

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = ()=>{
    handleClose()
    navigate('/profile');
  }

  const handleLogout = ()=>{
    handleClose()
    Cookies.remove('token')
    Cookies.remove('refresh-token')
    Cookies.remove('status')
    navigate('/login',{replace:true})
  }

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "20vw",
    },
  }));
  
  useEffect(()=>{
    setLetter(user?.user?.firstName?.charAt(0).toUpperCase());
  },[user])

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <AppBar position="static" color="secondary">
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setResetAI(false);
        }}
      >
        <Box p={2} width={"550px"} role="presentaition">
          {resetAI && <Chatbot />}
        </Box>
      </Drawer>
      <Modal open={isModalOpen} onClose={()=>{setIsModalOpen(false)}}>
        <ModalView setIsModalOpen={setIsModalOpen}/>
      </Modal>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={()=>navigate('/')} color="inherit" aria-label="logo">
          <DynamicFormIcon />
        </IconButton>
        <Typography variant="h6" component="div" width={"10vw"}>
          Q&AI
        </Typography>
       {page && <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search your query..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction={"row"} spacing={2}>
          <Button color="inherit" onClick={()=>{setIsModalOpen(true)}}>Post a Question</Button>
          <Button
            color="inherit"
            onClick={() => {
              setIsDrawerOpen(true);
              setResetAI(true);
            }}
          >
            Talk to AI
          </Button>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{letter}</Avatar>
            </IconButton>
          </Tooltip>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfile}>
            <Avatar /> My account
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
