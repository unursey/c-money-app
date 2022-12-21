import style from './Account.module.css';
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {URL_API} from '../../api/const';
import axios from 'axios';
import {Layout} from '../Layout/Layout';
import {Preloader} from '../../UI/Preloader/Preloader';
import {Link} from 'react-router-dom';
import {Currencies} from '../Currencies/Currencies';
import {Table} from './Table/Table';
import {fooChart} from '../../utils/dataChart';
import {Line} from 'react-chartjs-2';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import {Chart as ChartJS,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(
  CategoryScale, Tooltip, LineElement, PointElement, LinearScale,
);

export const Account = () => {
  const token = useSelector(state => state.token.token);
  const {id} = useParams();
  const [year, setYear] = useState('за последние 6 месяцев');
  const [num, setNum] = useState('');
  const [sum, setSum] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalOk, setShowModalOk] = useState(false);
  const [message, setMessage] = useState('');
  const [errorTo, setErrorTo] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);
  const [acc, setAcc] = useState(null);
  const [arr, setArr] = useState(null);
  const [count, setCount] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth');
    }
  });

  useEffect(() => {
    if (token) {
      axios({
        method: 'get',
        url: `${URL_API}/account/${id}`,
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
        .then(({data}) => {
          setAcc(data.payload);
          setArr(fooChart(data.payload, year, id));
          setIsLoaded(true);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [count]);

  const handleChangeTo = e => {
    setNum(e.target.value
      .replace(/\D/g, '').substr(0, 26)
    );
  };
  const handleChangeAmount = e => {
    setSum(e.target.value
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

  const handleReset = () => {
    setNum('');
    setSum('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sum !== '' && num !== '' && num.length >= 16 && num.length <= 26) {
      axios(`${URL_API}/transfer-funds`, {
        data: {
          from: acc.account,
          amount: sum,
          to: num,
        },
        method: 'POST',
        headers: {
          Authorization: `Basic ${token}`
        }
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
            handleReset();
            setTimeout(() => {
              setShowModalOk(false);
            }, 4000);
            const n = count + 1;
            setCount(n);
          }
        })
        .catch(err => console.error(err));
    } else {
      if (num === '' || num.length < 16 || num.length > 26) {
        setErrorTo(true);
      }
      if (sum === '') {
        setErrorAmount(true);
      }
    }
  };

  const changeYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <Layout>
      {!isLoaded ? (
        <div className={style.preloader__container}>
          <Preloader />
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.container__header}>
            <h2 className={style.title}>Счет №{id}</h2>
            <Link className={style.button__link}
              to={'/currencies'} element={<Currencies/>}>
              Вернуться
            </Link>
          </div>
          <div className={style.dynamic}>
            <div className={style.dynamic__header}>
              <h3 className={style.dynamic__title}>Динамика</h3>
              <p className={style.dynamic__year}>{year}</p>
              <select className={style.dynamic__select}
                value={year} onChange={changeYear}>
                <option hidden>Год</option>
                <option value='за последние 6 месяцев'>-</option>
                <option value='2022'>2022</option>
                <option value='2021'>2021</option>
                <option value='2020'>2020</option>
              </select>
            </div>
            {isLoaded && <Line data={arr}/>}
          </div>

          <div className={style.history}>
            <h3 className={style.history__title}>История переводов</h3>
            {isLoaded && (<Table data={acc}/>)}
          </div>
          <div className={style.transaction}>
            <h3 className={style.title + ' ' + style.transaction__title}>
              Перевод
            </h3>
            <form className={style.transaction__form} onSubmit={handleSubmit}>
              <div className={style['transaction__input-wrap']}>
                {errorTo && <span className={style.form__error}>
                  Введите номер счета от 16 до 26 символов
                </span>}

                <label htmlFor='to' className={style.transaction__label}>
                  Счет
                </label>
                <input
                  id='to'
                  className={style.transaction__input}
                  value={num}
                  onChange={(e) => {
                    handleChangeTo(e);
                    setErrorTo(false);
                  }}
                />
              </div>
              <div className={style['transaction__input-wrap']}>
                {errorAmount && <span className={style.form__error}>
                  Введите сумму
                </span>}

                <label htmlFor='amount' className={style.transaction__label}>
                  Сумма
                </label>
                <input
                  id='amount'
                  className={style.transaction__input}
                  value={sum}
                  onChange={(e) => {
                    handleChangeAmount(e);
                    setErrorAmount(false);
                  }}/>
              </div>
              <button className={style.button}>
                Перевести
              </button>
            </form>
          </div>
        </div>
      )}
      {showModal && <ErrorMessage message={message} />}
      {showModalOk && <SuccessMessage />}
    </Layout>
  );
};
