import React from 'react';
import classes from './Forecast.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, Paper, Skeleton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function Forecast() {
  return (
        <Card>
                <CardContent className={classes.Content}>
                    <Typography variant="h5" component="div">
                        Tel-Aviv
                    </Typography>
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 30 , color:"#ff5151" }}/>

                </CardContent>
                <CardContent className={[classes.Content , classes.Forecast].join(" , ")} >
                    <Paper/>
                    <Paper/>
                    <Paper/>
                    <Paper/>
                    <Paper/>
                </CardContent>

        </Card>
  )
}
