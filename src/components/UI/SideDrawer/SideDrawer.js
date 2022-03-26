import React from 'react'
import { Box, Drawer, FormControlLabel, FormGroup, Switch} from '@mui/material';
import classes from './SideDrawer.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';

export default function SideDrawer({status ,toggleDrawer}) {


  const dispatch = useDispatch();
  const themeMode = useSelector((state) =>state.ui.themeMode);

  return (
    <Drawer
     open={status}
     anchor="right"
     onClose={()=>toggleDrawer()}
    >
    <Box className={classes.Drawer}>
    <FormGroup className={classes.FormGroup}>
      <FormControlLabel control={<Switch {...(themeMode=="dark") ? {checked:true} : {checked:false}}  onChange={()=>dispatch(uiActions.toggleThemeMode())}/>} label="Dark mode" />
    </FormGroup>
    </Box>
  </Drawer>
  )
}

