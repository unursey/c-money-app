import {createSlice} from '@reduxjs/toolkit';
import {myCurRequestAsync} from './myCurAction';

const initialState = {
  loading: true,
  myCur: [],
  error: ''
};

export const myCurSlice = createSlice({
  name: 'myCur',
  initialState,
  reducers: {},
  extraReducers: {
    [myCurRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [myCurRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.myCur = action.payload.myCur;
      state.error = '';
    },
    [myCurRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default myCurSlice.reducer;
