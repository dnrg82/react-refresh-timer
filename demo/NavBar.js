import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@material-ui/icons/Menu';
import ReactRefreshTimer from '../src/ReactRefreshTimer';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My App
        </Typography>
        <ReactRefreshTimer />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
