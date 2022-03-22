import React, { useEffect, useState } from 'react';
import classes from './Forecast.module.css'
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Alert, Paper,Skeleton,Snackbar,Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { forecastActions } from '../../store/forecast-slice';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchInput from './SearchInput';

export default function Forecast() {

    const dispatch = useDispatch();


    const cityName = useSelector((state) => state.forecast.cityName);
    const cityKey = useSelector((state) => state.forecast.cityKey);
    const headline =  useSelector((state) => state.forecast.headline);
    const forecast =  useSelector((state) => state.forecast.fiveDaysForecast);
    const loading = useSelector((state) => state.forecast.loading);

     const [error, setError] = useState(false)

    
    useEffect(() => {

            const localData = (localStorage.getItem("localForecastState")) ? JSON.parse(localStorage.getItem("localForecastState")) :null;

            if(localData && localData.cityKey===cityKey){
                dispatch(
                    forecastActions.update({
                        localData:localData,
                        loading:false 
                    })
                )
            }else{
                

                fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=tH830Qy8EELpkoLx9i3rhN3EEDcA2FgK&metric=true`,{}).then(res=>res.json()).then(response=>{
            
                  const forecast = [];

                  response.DailyForecasts.forEach(forecastDay => {
                        forecast.push({
                            temp:{
                                min:forecastDay.Temperature.Minimum,
                                max:forecastDay.Temperature.Maximum
                            },
                            Icon:forecastDay.Day 
                        })
                    });
    

                    dispatch(
                        forecastActions.update({
                            headline:{
                                category:response.Headline.Category,
                                text:response.Headline.Text
                            },
                            fiveDaysForecast:forecast,
                            loading:false
                        })
                    )
        
                }).catch(error=>{
                    console.log(error);
    
                    setError(error)
  
            
                })

            }



    }, [cityKey])







  return (
        <>
        <SearchInput/>
        <Card>
                
                {
                 !loading ?
                <>
                <CardContent className={classes.Content}>
                    <Typography variant="h5" component="div">
                        {cityName}
                    </Typography>
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 30 , color:"#ff5151" }}/>
                </CardContent>
                <CardContent className={classes.Content}>
                    <Typography variant="h6" component="div" className={classes.Headline}>
                        {headline.text}
                    </Typography>
                </CardContent>
                <CardContent className={[classes.Content , classes.Forecast].join(" , ")} >
                    { forecast.map(forecastItem=>
                        <Paper>
                            <Typography variant="h6" component="div" className={classes.Temp}>
                                    {`${Math.ceil(forecastItem.temp.min.Value)}`}
                                    <span>{forecastItem.temp.min.Unit}</span>
                                    -
                                    {`${Math.ceil(forecastItem.temp.max.Value)}`}
                                    <span>{forecastItem.temp.min.Unit}</span>
                            </Typography>
                            <Typography component="div" className={classes.ForecastIcon}>
                                    <img src={`https://developer.accuweather.com/sites/default/files/${(forecastItem.Icon.Icon<10) ?`0${forecastItem.Icon.Icon}` : forecastItem.Icon.Icon}-s.png`} alt={forecastItem.Icon.IconPhrase} title={forecastItem.Icon.IconPhrase}/>
                            </Typography>
                        </Paper>
                    ) }
                </CardContent>
                </>
                :

                <>
                
                <CardContent className={classes.Content}>
                    <Typography variant="h5" component="div">
                        <Skeleton sx={{width:"100px"}}/>
                    </Typography>
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 30 , color:"#ff5151" }}/>
                </CardContent>
                <CardContent className={classes.Content}>
                    <Typography variant="h6" component="div" className={classes.Headline}>
                            <Skeleton sx={{width:"300px"}}/>
                    </Typography>
                </CardContent>
                <CardContent className={[classes.Content , classes.Forecast].join(" , ")} >
                    { forecast.map(()=>
                        <Paper>
                            <Typography variant="h6" component="div" className={classes.Temp}>
                                    <Skeleton sx={{width:"50px"}}/>
                            </Typography>
                            <Typography component="div" className={classes.ForecastIcon}>
                                    <Skeleton sx={{width:"100px"}}/>
                            </Typography>
                        </Paper>
                    ) }
                </CardContent>
                
                </>
              
                }

        </Card>
         {
             error && 
            <Alert severity="error">This is a success message!</Alert>
         }
        </>
  )
}
