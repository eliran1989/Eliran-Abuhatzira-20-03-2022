import React, { useEffect, useState } from 'react'
import { Paper, Skeleton, Typography } from '@mui/material';
import classes from './FavoriteItem.module.css';
import { apiKey } from '../../../apiKey';
import WeatherIcon from '../../UI/WeatherIcon/WeatherIcon';
import ClearIcon from '@mui/icons-material/Clear';
import { favoritesActions } from '../../../store/favorites-slice';
import { uiActions } from '../../../store/ui-slice';
import { forecastActions } from '../../../store/forecast-slice';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate   } from "react-router-dom";




export default function FavoriteItem({city_key , city_name}) {

    
    const [currentForecast, setCurrentForecast] = useState(false)
    const unitType = useSelector((state) => state.forecast.unitType);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {


        dispatch(
            uiActions.setError({
                errorMsg:false
            })
        )

    
        fetch(`https://dataservice.accuweather.com/currentconditions/v1/${city_key}?apikey=${apiKey}`).then(res=>res.json()).then((response)=>{

            setCurrentForecast({
                temp:(unitType==="C") ? response[0].Temperature.Metric :response[0].Temperature.Imperial,
                icon:response[0].WeatherIcon,
                text:response[0].WeatherText
            })
        }).catch(error=>{
            dispatch(
                uiActions.setError({
                    errorMsg:error.toString()
                })
            )
        })



    }, [unitType])



    const clickFavoriteHandler = () =>{
        navigate(`${process.env.PUBLIC_URL}/`);
        dispatch(
            forecastActions.changeCity({
                cityName:city_name,
                key:city_key
            })
        )

    }
    

  return (
    <>
    {
    currentForecast ?
    <Paper className={classes.Item} onClick={()=>clickFavoriteHandler()}>
        <ClearIcon className={classes.RemoveButton} onClick={()=>dispatch(
            favoritesActions.toggle({
                cityKey:city_key
            })
        )}/>
        <Typography variant="h5" component="div">
            {city_name}
        </Typography>
        <Typography variant="h6" component="div" className={classes.Temp}>
            {Math.ceil(currentForecast.temp.Value)}
            <span>{currentForecast.temp.Unit}</span>
        </Typography>
        <Typography variant="h6" component="div" className={classes.Temp}>
                {currentForecast.text}
        </Typography>
        <WeatherIcon icon_code={currentForecast.icon}/>
    </Paper>
    :
    <Paper className={classes.Item}>
        <Typography variant="h5" component="div">
            <Skeleton sx={{width:"60%" , margin:"0 auto" , display:"block"}}/>
        </Typography>
        <Typography variant="h6" component="div">
            <Skeleton sx={{width:"10%" , margin:"0 auto" , display:"block"}}/>
        </Typography>
        <Typography variant="h6" component="div">
            <Skeleton sx={{width:"50%" , margin:"0 auto" , display:"block"}}/>
        </Typography>
        <Skeleton variant="circular" width={40} height={40} sx={{width:"10%" , margin:"0 auto" , display:"block"}}/>
            
    </Paper>
    }
    </>
  )
}
