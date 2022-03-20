import './App.css';
import Header from './components/Header/Header'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">

    <BrowserRouter>

      <Header/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="favorites" element={<Favorites />} />
      </Routes>

    </BrowserRouter>


    </div>
  );
}

export default App;
