import { createSlice } from '@reduxjs/toolkit';

const forecastSlice = createSlice({
  name: 'forecast',
  initialState: {
    cityName:"Tel Aviv (Israel)",
    cityKey:"215854",
    headline:{
        category:"",
        text:""
    },
    fiveDaysForecast:[],
    loading:true,
    unitType:"C"
  },
  reducers: {
    update(state, action) {

            state.headline = {
                category:action.payload.headline.category,
                text:action.payload.headline.text
            }

            state.fiveDaysForecast = action.payload.fiveDaysForecast;
            localStorage.setItem("localForecastState" , JSON.stringify(state));

            state.loading = false;
        
    },
    changeCity(state , action){
            state.cityKey = action.payload.key;
            state.cityName = action.payload.cityName;
            state.loading = true;
    },
    toggleUnitType(state , action){
        state.unitType = (state.unitType==="C") ? "F":"C";
    }
  }
});

export const forecastActions = forecastSlice.actions;

export default forecastSlice;