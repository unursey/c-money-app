import {URL_API} from '../../api/const';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const myCurRequestAsync = createAsyncThunk(
  'myCur/fetch',
  async () => {
    const token = localStorage.getItem('Basic');

    try {
      const {data} =
      await axios.get(`${URL_API}/currencies`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
      const myCurData = data.payload;
      const myCur = Object.values(myCurData);
      console.log('myCur: ', myCur);
      return {myCur};
    } catch (err) {
      return ({error: err.toString()});
    }
  }
);
