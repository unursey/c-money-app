/* eslint-disable max-len */
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {accountRequestAsync} from '../store/account/accountAction';

export const useAccount = (id) => {
  const token = useSelector(state => state.token.token);
  const account = useSelector(state => state.account.account);
  const loading = useSelector(state => state.account.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(accountRequestAsync(id));
  }, [token]);

  return [account, loading];
};
