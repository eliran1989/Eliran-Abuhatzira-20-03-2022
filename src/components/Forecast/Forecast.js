import React, { useEffect, useState } from 'react';
import classes from './Forecast.module.css'
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Paper,Skeleton , Tooltip ,Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { forecastActions } from '../../store/forecast-slice';
import { favoritesActions } from '../../store/favorites-slice';
import { uiActions } from '../../store/ui-slice';
import {apiKey} from '../../apiKey';
import WeatherIcon from '../UI/WeatherIcon/WeatherIcon';




export default function Forecast() {


    const dispatch = useDispatch();
    
    const [favoriteHover , setFavoriteHover] = useState(false);



    const forecastState = useSelector((state) => state.forecast);
    const favorites = useSelector((state) => state.favorites.items);

    



    useEffect(() => {
        
        dispatch(
            uiActions.setError({
                errorMsg:false
            })
        )

            const localData = (localStorage.getItem("localForecastState")) ? JSON.parse(localStorage.getItem("localForecastState")) :null;

            if(localData && localData.cityKey===forecastState.cityKey){
                dispatch(
                    forecastActions.update({
                        localData:localData,
                        loading:false 
                    })
                )
            }else{
                

                fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${forecastState.cityKey}?apikey=${apiKey}&metric=true`,{}).then(res=>res.json()).then(response=>{
            
                  const forecast = [];
                  const daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


                  
                  response.DailyForecasts.forEach(forecastDay => {

                        forecast.push({
                            temp:{
                                min:forecastDay.Temperature.Minimum,
                                max:forecastDay.Temperature.Maximum
                            },
                            Icon:forecastDay.Day,
                            dayName:daysName[new Date(forecastDay.Date).getDay()]
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
                    
                    dispatch(
                        uiActions.setError({
                            errorMsg:error.toString()
                        })
                    )
            
                })

            }



    }, [forecastState.cityKey])




    const toggleFavoriteHandler = () =>{
        dispatch(
            favoritesActions.toggle({
                cityKey:forecastState.cityKey,
                cityName:forecastState.cityName
            })
        )
    }

  return (
        <Card>
                {
                 !forecastState.loading ?
                <>
                <CardContent className={classes.Content}>
                    <Typography variant="h5" component="div">
                        {forecastState.cityName}
                    </Typography>
                    <Tooltip title={(favorites.map((e)=>e.cityKey).indexOf(forecastState.cityKey) === -1) ? "Add to favorites":"Remove from favorites"} arrow>
                        {
                            (favorites.map((e)=>e.cityKey).indexOf(forecastState.cityKey) === -1  && !favoriteHover) ?
                            <FavoriteBorderOutlinedIcon 
                                onClick={()=>toggleFavoriteHandler()} 
                                onMouseEnter={()=>setFavoriteHover(true)} 
                                className={classes.FavIcon} 
                            />
                            :
                            <FavoriteIcon 
                                onClick={()=>toggleFavoriteHandler()} 
                                onMouseLeave={()=>setFavoriteHover(false)}
                                className={classes.FavIcon} 
                             />
                        }
                    </Tooltip>
                </CardContent>
                <CardContent className={classes.Content}>
                    <Typography variant="h6" component="div" className={classes.Headline}>
                        {forecastState.headline.text}
                    </Typography>
                </CardContent>
                <CardContent className={[classes.Content , classes.Forecast].join(" , ")} >
                    { forecastState.fiveDaysForecast.map((forecastItem , index)=>
                        <Paper key={`forecastItem${index}`}>
                            <Typography variant="h5" component="div" className={classes.Temp}>
                                    {forecastItem.dayName}
                            </Typography>
                            <Typography variant="h6" component="div" className={classes.Temp}>
                                    {`${Math.ceil(forecastItem.temp.min.Value)}`}
                                    <span>{forecastItem.temp.min.Unit}</span>
                                    -
                                    {`${Math.ceil(forecastItem.temp.max.Value)}`}
                                    <span>{forecastItem.temp.min.Unit}</span>
                            </Typography>
                            <WeatherIcon icon_code={forecastItem.Icon.Icon} title={forecastItem.Icon.IconPhrase} style={{margin:"0 auto" , display:"block"}}/>
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
                </CardContent>
                <CardContent className={classes.Content}>
                    <Typography variant="h6" component="div" className={classes.Headline}>
                            <Skeleton sx={{width:"300px"}}/>
                    </Typography>
                </CardContent>
                <CardContent className={[classes.Content , classes.Forecast].join(" , ")} >
                    { forecastState.fiveDaysForecast.map(()=>
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

  )
}
