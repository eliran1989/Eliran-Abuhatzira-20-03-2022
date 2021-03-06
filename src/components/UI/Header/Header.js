import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, Tab, Tabs } from '@mui/material';
import { Link, useLocation  } from 'react-router-dom';
import SideDrawer from '../SideDrawer/SideDrawer';
import MenuIcon from '@mui/icons-material/Menu';




export default function Header() {


  const [drawerStatus, setDrawerStatus] = useState(false)

  const location = useLocation();

  const toggleDrawer = () =>{
    setDrawerStatus(!drawerStatus)
  }


  return (
     <>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow:1}}>
            Weather
          </Typography>
            <Tabs value={location.pathname}>
                <Tab label="Home"  value={`${process.env.PUBLIC_URL}/`} component={Link} to={`${process.env.PUBLIC_URL}/`}/>
                <Tab label="Favorites"  value={`${process.env.PUBLIC_URL}/favorites`} component={Link} to={`${process.env.PUBLIC_URL}/favorites`} />
            </Tabs>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>toggleDrawer()}
            edge="start"
            sx={{marginLeft:"10px"}}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SideDrawer status={drawerStatus} toggleDrawer={toggleDrawer}/>
      </>
  );
}