import { configureStore } from '@reduxjs/toolkit';

import forecastSlice from './forecast-slice';
import favoritesSlice from './favorites-slice';

const store = configureStore({
  reducer: { forecast: forecastSlice.reducer, favorites: favoritesSlice.reducer },
});

export default store;