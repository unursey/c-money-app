import React from 'react';
import style from './Card.module.css';
import {PropTypes} from 'prop-types';
import formatDate from '../../../utils/formatDate';
import {Link} from 'react-router-dom';

export const Card = ({data}) => (
  <li className={style.card}>
    <Link to={`/account/${data.account}`}
      className={style.link}
      state={{id: data.account}}
    >
      <p className={style.id}>{data.account}</p>
      <p className={style.balance}>
        {data.balance.toFixed(2)}
      </p>
      <div className={style.info}>
        <div>
          <p>открыт</p>
          {data.date ? (
          <time dateTime={data.date}>
            {formatDate(data.date)}
          </time>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className={style.transaction}>
          <p>последняя операция</p>
          {data.transactions.length ? (
            <time dateTime={data.transactions[0].date}>
              {formatDate(data.transactions[0].date)}
            </time>
          ) : (
            <span>транзакций нет</span>
          )}
        </div>
      </div>
    </Link>
  </li>
);

Card.propTypes = {
  data: PropTypes.object,
};
