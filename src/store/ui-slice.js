import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    error:false
  },
  reducers: {
    setError(state , action){
      state.error = action.payload.errorMsg;

 
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;