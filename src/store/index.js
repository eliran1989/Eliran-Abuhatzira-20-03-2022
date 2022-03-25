import { configureStore } from '@reduxjs/toolkit';

import forecastSlice from './forecast-slice';
import favoritesSlice from './favorites-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: { 
     forecast: forecastSlice.reducer,
     favorites: favoritesSlice.reducer,
     ui: uiSlice.reducer
    },
});

export default store;