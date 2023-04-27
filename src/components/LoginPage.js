import { Box, Container, CssBaseline, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid} from '@mui/material'
import LockOutlinedIcon  from '@mui/icons-material/LockOutlined'
import React from 'react'
import { Link } from 'react-router-dom'
// import BackgroundLogo from '../images/login-background.png'

const LoginPage = () => {
  return (
    <Box className="bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen flex justify-center items-center flex-col">
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor:'white',
            width: '29vw',
            height: '5vw',
            marginBottom: '15px',
            padding: '10px',
            borderRadius:'10px'
        }}>
            <Typography variant='h5' fontWeight={'600'} color={'primary'}>Q&AI</Typography>
            <Typography>Introducing AI to your community</Typography>
        </Box>
      <Container component="main" maxWidth="xs" sx={{
        backgroundColor:'white',
        padding: '10px',
        borderRadius:'10px',
      }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to={'/signup'} style={{color:'blue'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item xs>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default LoginPage
