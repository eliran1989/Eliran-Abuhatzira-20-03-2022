import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: (localStorage.getItem("favoritesCitiesForecast")) ? JSON.parse(localStorage.getItem("favoritesCitiesForecast")) : []
  },
  reducers: {
    toggle(state, action) {


      if(state.items.indexOf(action.payload.cityKey)!==-1){
        state.items = state.items.filter((cityKey)=>cityKey!==action.payload.cityKey)
      }else{
        state.items = [...state.items , action.payload.cityKey]
      }


      localStorage.setItem("favoritesCitiesForecast" , JSON.stringify(state.items));


    }
  }
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice;