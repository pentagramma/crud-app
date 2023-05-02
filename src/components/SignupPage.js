import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { checkFormData } from "../utils/signupValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {base_url} from '../utils/base_url'

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [helperText, setHelperText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [err,setErr] = useState(false)
  const [errorVal,setErrorVal] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault();
    setHelperText({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setErr(false)
    const validationResult = checkFormData(formData)
    if(Object.keys(validationResult).length>0){
      setHelperText({...validationResult})
    }
    else{
      axios.post(`${base_url}/api/v1/signup`,formData).then((response)=>{
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        })
        navigate('/login',{state:true,replace:true})
      }).catch((error)=>{
        setErr(true)
        setErrorVal(error.response.data.message)
      })
    }

  };

  const inputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{
            height:'4vw'
          }}>
          {err && <Alert severity="error" onClose={() => {setErr(false)}}>
            {errorVal}
          </Alert>}
          </Box>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  type="text"
                  value={formData.firstName}
                  onChange={inputChangeHandler}
                  helperText={helperText.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={inputChangeHandler}
                  helperText={helperText.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={inputChangeHandler}
                  helperText={helperText.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={inputChangeHandler}
                  helperText={helperText.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/login"} style={{ color: "blue" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
