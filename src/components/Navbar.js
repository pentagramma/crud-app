import React, { useEffect } from "react";
import { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Box,
  Drawer,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Modal,
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

  const handleLogout = () => {
    handleClose();
    Cookies.remove("token");
    Cookies.remove("refresh-token");
    Cookies.remove("status");
    Cookies.remove("isLoggedIn");
    Cookies.remove("user");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    setLetter(user?.user?.firstName?.charAt(0).toUpperCase());
  }, [user]);

  useEffect(()=>{
    setSearchString('')
  },[resetTrigger])

  const searchChangeHandler = (e) => {
    if (e.target.value) {
      setClearCheck(true);
    } else {
      setClearCheck(false);
    }
    setSearchString(e.target.value);
  };

  const searchSubmitHandler = (e) => {
    if (searchString && e.key === "Enter") {
      axios
        .get(`${base_url}/api/v1/questions/search/${searchString}`)
        .then((response) => {
          if(response.data.searchedQuestions.length > 0){
            setSearchResultCheck(false)
            setSearchCheck(true)
            dispatch(fetchQuestions(response.data.searchedQuestions))
          }
          else{
            setSearchResultCheck(true)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <ModalView setIsModalOpen={setIsModalOpen} />
      </Modal>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={()=>navigate('/')} color="inherit" aria-label="logo">
          <DynamicFormIcon />
        </IconButton>
        <Typography variant="h6" component="div" width={"10vw"}>
          Q&AI
        </Typography>
        {page && (
          <Box
            sx={{
              backgroundColor: "white",
              color: "#9c27b0",
              padding: "6px",
              borderRadius: "7px",
              width: "370px",
            }}
          >
            <SearchIcon />
            <input
              style={{
                outline: "none",
                background: "none",
                marginLeft: "10px",
                width: "300px",
              }}
              placeholder="Search your query..."
              onChange={searchChangeHandler}
              onKeyDown={searchSubmitHandler}
              value={searchString}
            />
            {clearCheck && <ClearIcon sx={{cursor:'pointer'}} onClick={()=>{setSearchString('');setClearCheck(false)}}/>}
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction={"row"} spacing={2}>
          <Button
            color="inherit"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Post a Question
          </Button>
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
              <Avatar src={user.imageUrl} sx={{ width: 32, height: 32 }}>
               {letter}
              </Avatar>
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
            <Avatar   src={user?.imageUrl}/> My account
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
