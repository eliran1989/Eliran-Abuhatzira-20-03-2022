import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    error:false,
    themeMode:"light"
  },
  reducers: {
    setError(state , action){
      state.error = action.payload.errorMsg;
    },
    toggleThemeMode(state, action){
      state.themeMode = (state.themeMode=="light") ? "dark" : "light";
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;