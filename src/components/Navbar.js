import React from 'react'
import {styled, alpha} from '@mui/material/styles'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography, Box, InputBase } from '@mui/material'
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: '20vw',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
            <DynamicFormIcon/>
        </IconButton>
        <Typography variant='h6' component='div' width={'10vw'}>
            Q&AI
        </Typography>
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="What do you want to ask?"
            inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
          <Box sx={{ flexGrow: 1 }} />
        <Stack direction={'row'} spacing={2}>
            <Button color='inherit'>Profile</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
