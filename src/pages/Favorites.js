import React from 'react'
import { Container } from '@mui/material'
import FavoritesContainer from '../components/Favorites/FavoritesContainer'

export default function Favorites() {
  return (
    <Container sx={{marginTop:"10px"}} maxWidth="xl">
        <FavoritesContainer/>
    </Container>
  )
}
