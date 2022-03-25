import React, { useEffect, useState } from 'react'
import { Card, Typography} from '@mui/material'
import FavoriteItem from './FavoriteItem/FavoriteItem'
import classes from './FavoritesContainer.module.css'
import { useSelector } from 'react-redux';

export default function FavoritesContainer() {


  const favorites = useSelector((state) => state.favorites.items);


  return (
    <Card className={classes.FavoritesContainer}>
        {
          favorites.length ?
          favorites.map((city)=><FavoriteItem key={city.cityKey} city_key={city.cityKey} city_name={city.cityName}/>)
          :
          <Typography variant="h5" component="div">
              There are no favorites
          </Typography>
        }
    </Card>
  )
}
