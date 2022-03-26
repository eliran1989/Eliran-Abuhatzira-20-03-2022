import React from 'react'
import { Box, Divider, Drawer, FormControlLabel, FormGroup, Stack, Switch, Typography} from '@mui/material';
import classes from './SideDrawer.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { forecastActions } from '../../../store/forecast-slice';


export default function SideDrawer({status ,toggleDrawer}) {


  const dispatch = useDispatch();
  const themeMode = useSelector((state) =>state.ui.themeMode);
  const unitType = useSelector((state)=>state.forecast.unitType);






  
  return (
    <Drawer
     open={status}
     anchor="right"
     onClose={()=>toggleDrawer()}
    >
    <Box className={classes.Drawer}>
    <FormGroup className={classes.FormGroup}>
    <Typography variant='h6'>Theme</Typography>
    <Divider />
      <FormControlLabel control={<Switch {...(themeMode=="dark") ? {checked:true} : {checked:false}}  onChange={()=>dispatch(uiActions.toggleThemeMode())}/>} label={(themeMode=="dark") ? "Dark mode" : "Light mode"} />
      <Typography variant='h6'>Unit</Typography>
      <Divider />
      <Stack direction="row"  alignItems="center">
        <Typography>F</Typography>
        <Switch {...(unitType==="C") ? {checked:true} : {checked:false}}  onChange={()=>dispatch(forecastActions.toggleUnitType())} />
        <Typography>C</Typography>
      </Stack>
      
    </FormGroup>
    </Box>
  </Drawer>
  )
}

