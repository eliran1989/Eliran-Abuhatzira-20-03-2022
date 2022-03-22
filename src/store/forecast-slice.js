import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const forecastSlice = createSlice({
  name: 'forecast',
  initialState: {
    cityName:"Tel Aviv , IL",
    cityKey:"213225",
    headline:{
        category:"",
        text:""
    },
    fiveDaysForecast:[],
    loading:true
  },
  reducers: {
    update(state, action) {

        if(action.payload.localData){
            state.headline = {
                category:action.payload.localData.headline.category,
                text:action.payload.localData.headline.text
            }
            state.fiveDaysForecast = action.payload.localData.fiveDaysForecast;
        }else{
            state.headline = {
                category:action.payload.headline.category,
                text:action.payload.headline.text
            }

            state.fiveDaysForecast = action.payload.fiveDaysForecast;
            localStorage.setItem("localForecastState" , JSON.stringify(state));
        }

        state.loading = action.payload.loading;
        
    },
    changeCity(state , action){
        state.cityKey = action.payload.key;
        state.cityName = action.payload.cityName;
        state.loading = true;

    }
  }
});

export const forecastActions = forecastSlice.actions;

export default forecastSlice;