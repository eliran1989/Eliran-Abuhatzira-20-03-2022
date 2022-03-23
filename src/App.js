import * as React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header/Header'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  
  

  const theme = createTheme({
    palette: {
      mode: 'light'
    },
  })


  
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
    <Header/>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>


    </ThemeProvider>
  );
}

export default App;
