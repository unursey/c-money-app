import style from './Currencies.module.css';
import React, {useEffect} from 'react';
import axios from 'axios';
import {URL_API} from '../../api/const';
import {Layout} from '../Layout/Layout';
import {Card} from './Card/Card';
import {useDispatch, useSelector} from 'react-redux';
import {currenciesRequestAsync} from '../../store/currencies/currenciesAction';
import {Preloader} from '../../UI/Preloader/Preloader';
import {currenciesSlice} from '../../store/currencies/currenciesSlice';
import {Navigate} from 'react-router-dom';

export const Currencies = () => {
  const token = useSelector(state => state.token.token);
  const accounts = useSelector(state => state.currencies.accounts);
  const loading = useSelector(state => state.currencies.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(currenciesRequestAsync());
    }
  }, [token]);

  const handleSort = (e) => {
    if (!e.target.value) return;

    const arr = [...accounts];

    if (e.target.value === 'transaction') {
      arr.sort((a, b) => {
        if (a.transactions[0].date < b.transactions[0].date) {
          return 1;
        }
        if (a.transactions[0].date > b.transactions[0].date) {
          return -1;
        }
        return 0;
      });
    } else {
      arr.sort((a, b) => {
        if (a[e.target.value] > b[e.target.value]) {
          return 1;
        }
        if (a[e.target.value] < b[e.target.value]) {
          return -1;
        }
        return 0;
      });
    }
    console.log(arr);
    dispatch(currenciesSlice.actions.updateAccounts(arr));
  };

  const addAccount = () => {
    axios(`${URL_API}/create-account`, {
      method: 'post',
      headers: {
        Authorization: `Basic ${token}`,
      }
    })
      .then(({data}) => {
        dispatch(currenciesSlice.actions.createAccount(data.payload));
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Layout>
      {token ? loading ? (
        <div className={style.preloader__container}>
          <Preloader />
        </div>
      ) : (
        <div className={style.container}>
          <h2 className={style.title}>Здравствуйте, Александр!</h2>
          <button
            className={style.button}
            onClick={addAccount}>
            Открыть новый счет
          </button>
          <div className={style.currencies}>
            <h3 className={style.currencies__title}>Мои счета</h3>
            <div className={style.sort}>
              <span className={style.sort__title}>Сортировка:</span>
              <select className={style.select} onChange={handleSort}>
                <option value='date'>по дате открытия</option>
                <option value='account'>по номеру счёта</option>
                <option value='balance'>по балансу</option>
                <option value='transaction'>по дате транзакции</option>
              </select>
            </div>
            <ul className={style.list}>
              {accounts && accounts.map(item => (
                <Card className={style.card} key={item.account} data={item} />
              ))}
            </ul>
          </div>
        </div>
      ) :
      (<Navigate to='/auth' />)
      }
    </Layout>
  );
};
