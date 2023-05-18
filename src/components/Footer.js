import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        marginTop: 'auto', // Pushes the footer to the bottom
        minHeight: '80px', // Set a minimum height for the footer
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1" color="textSecondary">
        &copy; 2023 Your Website. All rights reserved.
      </Typography>
      <Box>
        <IconButton aria-label="Instagram">
          <InstagramIcon />
        </IconButton>
        <IconButton aria-label="Twitter">
          <TwitterIcon />
        </IconButton>
        <IconButton aria-label="Facebook">
          <FacebookIcon />
        </IconButton>
      </Box>
      <Link
        href="#"
        variant="body2"
        color="textSecondary"
        underline="none"
        target="_blank"
        rel="noopener"
      >
        Terms of Service
      </Link>
    </Box>
  );
};

export default Footer;
