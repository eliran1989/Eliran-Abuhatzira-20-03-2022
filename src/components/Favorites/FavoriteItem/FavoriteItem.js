import React, { useEffect, useMemo, useState } from 'react'
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
import { useFetch } from '../../../hooks/useFetch';




export default function FavoriteItem({city_key , city_name}) {

    
    const unitType = useSelector((state) => state.forecast.unitType);
    const navigate = useNavigate();
    const dispatch = useDispatch();

     const {data:forecastResponse , error} = useFetch(`https://dataservice.accuweather.com/currentconditions/v1/${city_key}?apikey=${apiKey}`);


    const currentForecast = useMemo(()=>{

        return forecastResponse && {
            temp:(unitType==="C") ? forecastResponse[0].Temperature.Metric :forecastResponse[0].Temperature.Imperial,
            icon:forecastResponse[0].WeatherIcon,
            text:forecastResponse[0].WeatherTextw
        }
    },[forecastResponse])

    console.log(forecastResponse)


    useEffect(()=>{
        dispatch(uiActions.setError({errorMsg:error?.toString()}))
    },[error])


    useEffect(() => {
     

        dispatch(
            uiActions.setError({
                errorMsg:false
            })
        )






    }, [unitType])





    const clickFavoriteHandler = (e) =>{
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
    <Paper className={classes.Item} >
        <ClearIcon className={classes.RemoveButton} onClick={(e)=>{
            dispatch(
                favoritesActions.toggle({
                    cityKey:city_key
                })
            )
        }}/>
        <Typography variant="h5" component="div" onClick={(e)=>clickFavoriteHandler(e)} className={classes.Title}>
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
