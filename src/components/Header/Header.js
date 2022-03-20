import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import classes from './Header.module.css'



export default function Header() {
  return (
      <AppBar className={classes.Header}>
        <Toolbar>
          <Typography variant="h6" component="div" className={classes.Title}>
            Weather
          </Typography>
          <Button className={classes.Button+" , "+classes.Active}>Home</Button>
          <Button className={classes.Button}>Favorites</Button>
        </Toolbar>
      </AppBar>
  );
}