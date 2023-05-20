import {
  Box,
  Alert,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkFormData } from "../utils/loginValidation";
import axios from "axios";
import { base_url } from "../utils/base_url";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginActions } from "../redux/Login/loginActions";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [helperText, setHelperText] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const [errorVal, setErrorVal] = useState("");
  const [severity, setSeverity] = useState("error");
  const location = useLocation();
  const dispatch = useDispatch()
  useEffect(() => {
    if (location.state) {
      setErr(location.state);
      setErrorVal("Account Created Successfully!");
      setSeverity("success");
    }
  }, [location.state]);

  const inputUpdateHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setHelperText({
      email: "",
      password: "",
    });
    setErr(false);
    const validationResult = checkFormData(formData);
    if (Object.keys(validationResult).length > 0) {
      setHelperText({ ...validationResult });
    } else {
      try {
        axios
          .post(`${base_url}/api/v1/user/login`, formData)
          .then((response) => {
            setFormData({
              email: "",
              password: "",
            });
            // console.log(response)
            Cookies.set("token", response.data.token);
            Cookies.set("refresh-token", response.data.refresh_token);
            Cookies.set("status", "Y");
            Cookies.set("isLoggedIn","true")
            Cookies.set("user",JSON.stringify(response.data.user))
            dispatch(loginActions(response.data.user));
            navigate("/", { replace: true });
          })
          .catch((error) => {
            setErr(true);
            setErrorVal(error.response.data.message);
            setSeverity("error");
          });
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <Box className="bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen flex justify-center items-center flex-col">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: "29vw",
          height: "5vw",
          marginBottom: "15px",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" fontWeight={"600"} color={"primary"}>
          Q&AI
        </Typography>
        <Typography>Introducing AI to your community</Typography>
      </Box>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "4vw",
            }}
          >
            {err && (
              <Alert
                severity={severity}
                onClose={() => {
                  setErr(false);
                }}
              >
                {errorVal}
              </Alert>
            )}
          </Box>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" sx={{ mt: 1 }} onSubmit={submitHandler}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={inputUpdateHandler}
              helperText={helperText.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={inputUpdateHandler}
              helperText={helperText.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to={"/signup"} style={{ color: "blue" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item xs></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
