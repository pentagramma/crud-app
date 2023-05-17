import React from 'react';
import { Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#1976d2',
        color: '#fff',
        padding: '16px',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" component="p">
        &copy; {new Date().getFullYear()} My Website. All rights reserved.
      </Typography>
      <Typography variant="body2" component="p">
        Created with React and Material-UI.
      </Typography>
      <Typography variant="body2" component="p">
        Powered by{' '}
        <Link href="https://mui.com/" color="inherit">
          Material-UI
        </Link>
        .
      </Typography>
    </footer>
  );
};

export default Footer;
