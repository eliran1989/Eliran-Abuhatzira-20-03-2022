import { Typography } from '@mui/material'
import React from 'react'

export default function WeatherIcon({icon_code , title , style}) {
  return (
    <Typography component="div" >
        <img src={`https://developer.accuweather.com/sites/default/files/${(icon_code<10) ?`0${icon_code}` : icon_code}-s.png`} alt={title} title={title} style={{...style}}/>
    </Typography>
  )
}
