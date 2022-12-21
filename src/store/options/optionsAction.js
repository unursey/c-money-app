import {URL_API} from '../../api/const';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';


export const optionsRequestAsync = createAsyncThunk(
  'currencies/fetch',
  async () => {
    const token = localStorage.getItem('Basic');

    try {
      const {data} =
      await axios.get(`${URL_API}/all-currencies`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
      const options = data.payload;
      return {options};
    } catch (err) {
      return ({error: err.toString()});
    }
  }
);
