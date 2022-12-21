// import {updateToken, deleteToken} from '../store/tokenReducer';
// import {useDispatch} from 'react-redux';
// import axios from 'axios';
// import {URL_API} from './const';

export const setToken = (token) => {
  localStorage.setItem('Basic', token);
};

export const getToken = (log, pass) => {
  // const dispatch = useDispatch();
  const token = localStorage.getItem('Basic') || '';
  setToken(token);

  return token;
};
