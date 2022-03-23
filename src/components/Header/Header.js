import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Tab, Tabs } from '@mui/material';
import { Link, useLocation  } from 'react-router-dom';



export default function Header() {

  const location = useLocation();

  

  return (
      <AppBar color="default" position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow:1}}>
            Weather
          </Typography>
              <Tabs value={location.pathname}>
                <Tab label="Home"  value="/" component={Link} to="/"/>
                <Tab label="Favorites"  value="/favorites" component={Link} to="/favorites" />
            </Tabs>
        </Toolbar>
      </AppBar>
  );
}