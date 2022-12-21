import {createSlice} from '@reduxjs/toolkit';
import {currenciesRequestAsync} from './currenciesAction';

const initialState = {
  loading: true,
  accounts: [],
  error: '',
};

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    createAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
    updateAccounts: (state, action) => {
      state.accounts = action.payload;
    },
  },
  extraReducers: {
    [currenciesRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [currenciesRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.accounts = action.payload.accounts;
      state.error = '';
    },
    [currenciesRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default currenciesSlice.reducer;
