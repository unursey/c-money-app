/* eslint-disable max-len */
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {optionsRequestAsync} from '../store/options/optionsAction';

export const useOptions = () => {
  const token = useSelector(state => state.token.token);
  const options = useSelector(state => state.options.options);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(optionsRequestAsync());
  }, [token]);

  return [options];
};
