import  React  from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Header from './components/UI/Header/Header'
import {BrowserRouter,Routes,Route, useLocation} from "react-router-dom";
import { Alert, Slide, Snackbar } from '@mui/material';




function App(props) {
  

  const uiState = useSelector((state) => state.ui);


  const theme = createTheme({
    palette: {
      mode: uiState.themeMode
    },
  })


  
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
