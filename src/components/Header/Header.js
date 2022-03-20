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
          <Typography variant="h5" component="div"  sx={{ flexGrow: 2 }}>
            Weather
          </Typography>
          <Button color="inherit" className={classes.Button+" , "+classes.Active} sx={{ flexGrow:1}}>Home</Button>
          <Button color="inherit" className={classes.Button} sx={{ flexGrow:1}}>Favorites</Button>
        </Toolbar>
      </AppBar>
  );
}