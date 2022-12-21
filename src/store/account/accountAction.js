import {URL_API} from '../../api/const';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const accountRequestAsync = createAsyncThunk(
  'account/fetch',
  async (id, {getState}) => {
    const token = localStorage.getItem('Basic');

    try {
      const {data} =
      await axios.get(`${URL_API}/account/${id}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
      const account = data.payload;
      console.log('account data: ', account);
      return {account};
    } catch (err) {
      return ({error: err.toString()});
    }
  }
);
