import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: (localStorage.getItem("favoritesCitiesForecast")) ? JSON.parse(localStorage.getItem("favoritesCitiesForecast")) : []
  },
  reducers: {
    toggle(state, action) {

      if(state.items.map((city)=>city.cityKey).indexOf(action.payload.cityKey)!==-1){
        state.items = state.items.filter((city)=>city.cityKey!==action.payload.cityKey)
      }else{
        state.items = [...state.items , {cityKey:action.payload.cityKey , cityName: action.payload.cityName}]
      }


      localStorage.setItem("favoritesCitiesForecast" , JSON.stringify(state.items));


    }
  }
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice;