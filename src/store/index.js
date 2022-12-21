import {tokenReducer, tokenMiddleware} from './tokenReducer';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import currenciesSlice from './currencies/currenciesSlice';
import accountSlice from './account/accountSlice';
import optionsSlice from './options/optionsSlice';
import myCurSlice from './myCur/myCurSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    currencies: currenciesSlice,
    account: accountSlice,
    options: optionsSlice,
    myCur: myCurSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware, thunk),
});
