import style from './Table.module.css';
import {PropTypes} from 'prop-types';
import formatDate from '../../../utils/formatDate';

export const Table = ({data}) => {
  const {
    account,
    transactions,
  } = data;

  return (
    <div className={style.table__container}>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th className={style.th}>Счет</th>
            <th className={style.th}>Сумма</th>
            <th className={style.th}>Дата</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {transactions.length ? (
            [...transactions]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((item, index) => (
                <tr key={index} className={style.tr}>
                  <td className={style.td + ' ' + style.td__account}>
                    {item.from === account ? item.to : item.from}
                  </td>
                  {item.from === account ?
                  (<td className={style.td + ' ' +
                  style.td_middle + ' ' + style.td_color}>
                    {item.amount * -1}
                  </td>) :
                  (<td className={style.td + ' ' + style.td_middle}>
                    {item.amount}
                  </td>)}
                  <td className={style.td + ' ' + style.td__date}>
                    {formatDate(item.date).replace(/,.*/, '')}
                  </td>
                </tr>
              ))
        ) : (
          <tr>
            <td className={style.td}></td>
            <td className={style.td}></td>
            <td className={style.td}></td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.object,
};
