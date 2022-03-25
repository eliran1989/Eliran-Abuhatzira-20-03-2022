import React from 'react';
import Forecast from '../components/Forecast/Forecast';
import Container from '@mui/material/Container';
import SearchInput from '../components/Forecast/SearchInput/SearchInput';

export default function Home() {
  return (
    <Container sx={{marginTop:"10px"}} maxWidth="xl">
        <SearchInput/>
        <Forecast/>
    </Container>
  )
}
