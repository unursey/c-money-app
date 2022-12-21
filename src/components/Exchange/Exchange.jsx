import style from './Exchange.module.css';
import {useRef, useState, useEffect} from 'react';
import {SVG} from '../../UI/SVG/SVG';
import Layout from '../Layout';
import {URL_API_WS, URL_API} from '../../api/const';
import Option from './Option';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import axios from 'axios';

export const Exchange = () => {
  const token = useSelector(state => state.token.token);
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalOk, setShowModalOk] = useState(false);
  const [message, setMessage] = useState('');
  const [cur, setCur] = useState([]);
  const selectFrom = useRef(null);
  const selectTo = useRef(null);
  const navigate = useNavigate();
  const [countCur, setCountCur] = useState(1);

  useEffect(() => {
    if (!token) {
      navigate('/auth');
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios({
        method: 'get',
        url: `${URL_API}/currencies`,
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
        .then(({data}) => {
          const myCurData = data.payload;
          const myCur = Object.values(myCurData);
          setCur(myCur);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [countCur]);

  const [barData, setBarData] = useState([]);
  const data = [];
  let count = 0;

  useEffect(() => {
    const ws = new WebSocket(URL_API_WS);
    ws.onopen = () => console.log('ws opened');
    ws.onclose = () => console.log('ws closed');
    ws.onmessage = e => {
      const i = JSON.parse(e.data);
      data.push(i);
      count++;
      if (count > 6) {
        data.shift();
      }
      setBarData([...data]);
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleChangeAmount = e => {
    setAmount(e.target.value
      .replace(/\D/ig, function() {
        let dotCount = 0;
        return function($0) {
          if ($0 === '.' && !dotCount) {
            dotCount += 1;
            return $0;
          }
          return '';
        };
      }())
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount !== '' && selectFrom.current.value !== selectTo.current.value) {
      axios({
        method: 'post',
        url: `${URL_API}/currency-buy`,
        data: {
          from: selectFrom.current.value,
          to: selectTo.current.value,
          amount,
        },
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
        .then(({data}) => {
          if (!data.payload) {
            setMessage(data.error);
            setShowModal(true);
            setTimeout(() => {
              setShowModal(false);
            }, 4000);
          } else {
            setShowModalOk(true);
            setAmount('');
            setTimeout(() => {
              setShowModalOk(false);
            }, 4000);
            const num = countCur + 1;
            setCountCur(num);
          }
        })
        .catch((error) => console.log(error.message));
    } else {
      setMessage();
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    }
  };

  return (
    <Layout>
      <div className={style.container}>
        <h2 className={style.title}>Обмен валюты</h2>
        <div className={style.wrapper}>
          <div className={style.rates__wrapper}>
            <h3 className={style.rates__title}>
              Изменение курса в режиме реального времени
            </h3>
            <div className={style.tbody}>
              {barData.map((item, index) => (
                <div className={style.tr_e} key={index}>
                  <span
                    className={style.td__first}>{item?.from}/{item?.to}</span>
                  <span className={style.td__second}/>
                  <span className={style.td__third}>
                    {item?.rate}{item?.change === 1 ?
                    (<SVG iconName='upIcon'
                      width={9} height={8}
                      className={style.exit} />) :
                    (<SVG iconName='downIcon'
                      width={9} height={8}
                      className={style.exit} />)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={style.right__wrapper}>
            <div className={style.exchange__wrapper}>
              <h3 className={style.exchange__title}>Обмен валюты</h3>
              <form id='form' className={style.form} onSubmit={handleSubmit}>
                <div className={style.inputs__wrapper}>
                  <div className={style.input__wrapper}>
                    <label className={style.label} htmlFor='from'>Откуда</label>
                    <select className={style.input} ref={selectFrom}>
                      <Option />
                    </select>
                  </div>
                  <div className={style.input__wrapper}>
                    <label className={style.label}>Куда</label>
                    <select className={style.input} ref={selectTo}>
                      <Option />
                    </select>
                  </div>
                  <div className={style.input__wrapper}>
                    <span className={style.form__error}></span>
                    <label htmlFor='amount' className={style.label}>
                      Сумма
                    </label>
                    <input className={style.input}
                      id='amount'
                      value={amount}
                      onChange={(e) => {
                        handleChangeAmount(e);
                      }}
                    />
                  </div>
                </div>
                <button htmlFor='form' className={style.button}>
                  Обменять
                </button>
              </form>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th className={style.currency__title} colSpan="2">
                      Мои валюты
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cur.length > 0 ? cur.map(item => (
                    <tr className={style.tr} key={item.code}>
                      <td className={style.td__code}>{item.code}</td>
                      <td className={style.td__amount}>
                        {Number.isInteger(item.amount) ?
                          item.amount :
                          parseFloat(item.amount.toFixed(2 + 1).slice(0, -1))}
                      </td>
                    </tr>
                  )
                  ) : (<tr><td>-</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal && <ErrorMessage message={message} />}
      {showModalOk && <SuccessMessage />}
    </Layout>
  );
};
