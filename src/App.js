import  React, { useEffect }  from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Header from './components/UI/Header/Header'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Alert, Slide, Snackbar } from '@mui/material';




function App() {
  
  const error = useSelector((state) => state.ui.error);


 
  const theme = createTheme({
    palette: {
      mode: 'light'
    },
  })



  console.log(error);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Snackbar
            open={error}
            TransitionComponent={(props)=><Slide {...props} direction="right" />}
         >
          <Alert severity="error">{`An error has occurred: ${error}`}</Alert>
        </Snackbar>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
