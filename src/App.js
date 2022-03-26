import  React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Header from './components/UI/Header/Header'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Alert, Slide, Snackbar } from '@mui/material';
import { forecastActions } from './store/forecast-slice';
import { apiKey } from './apiKey';
import { uiActions } from './store/ui-slice';




function App(props) {
  

  const uiState = useSelector((state) => state.ui);


   const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      mode: uiState.themeMode
    },
  })


  useEffect(() => {

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{

          fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${position.coords.latitude},${position.coords.longitude}`).then(res=>res.json()).then(response=>{

          
            dispatch(
              forecastActions.changeCity({
                cityName:response.EnglishName,
                key:response.Key
              })
            )

          }).catch(error=>{

            dispatch(
              uiActions.setError({
                  errorMsg:error.toString()
              })
            )

          })



        });
      }

  }, [])
  



  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/">
      <Header/>
        <Routes>
          <Route exact path={`${process.env.PUBLIC_URL}/`}  element={<Home />} />
          <Route path={`${process.env.PUBLIC_URL}/favorites`} exact element={<Favorites />} />
        </Routes>
        <Snackbar
            open={uiState.error}
            TransitionComponent={(props)=><Slide {...props} direction="right" />}
         >
          <Alert severity="error">{`An error has occurred: ${uiState.error}`}</Alert>
        </Snackbar>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
