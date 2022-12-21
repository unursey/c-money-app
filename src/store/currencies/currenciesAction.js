import {URL_API} from '../../api/const';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';


export const currenciesRequestAsync = createAsyncThunk(
  'currencies/fetch',
  async (username, {getState}) => {
    const token = localStorage.getItem('Basic');

    try {
      const {data} =
      await axios.get(`${URL_API}/accounts`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
      const accounts = data.payload;
      console.log('currencies: ', data);
      return {accounts};
    } catch (err) {
      return ({error: err.toString()});
    }
  }
);

