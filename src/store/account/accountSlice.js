import {createSlice} from '@reduxjs/toolkit';
import {accountRequestAsync} from './accountAction';

const initialState = {
  loading: true,
  account: {},
  error: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: {
    [accountRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [accountRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.account = action.payload.account;
      state.error = '';
    },
    [accountRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  }
});

export default accountSlice.reducer;
