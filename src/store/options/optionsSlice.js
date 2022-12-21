import {createSlice} from '@reduxjs/toolkit';
import {optionsRequestAsync} from './optionsAction';

const initialState = {
  loading: true,
  options: [],
  error: '',
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {},
  extraReducers: {
    [optionsRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [optionsRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.options = action.payload.options;
      state.error = '';
    },
    [optionsRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default optionsSlice.reducer;
