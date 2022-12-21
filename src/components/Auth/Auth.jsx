import {useState} from 'react';
import style from './Auth.module.css';
import {Layout} from '../Layout/Layout';
import {useNavigate, Navigate} from 'react-router-dom';
import {ErrorAuth} from '../ErrorAuth/ErrorAuth';
import {useSelector, useDispatch} from 'react-redux';
import {updateToken, deleteToken} from '../../store/tokenReducer';
import {URL_API} from '../../api/const';
import axios from 'axios';

export const Auth = () => {
  const [log, setLog] = useState('');
  const [pass, setPass] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorLog, setErrorLog] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  let token = useSelector(state => state.token.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeLog = e => {
    setLog(e.target.value
      .replace(/^ +|[^A-Za-z ]/g, '')
      .replace(/ +(\w*).*/, '')
    );
  };

  const handleChangePass = e => {
    setPass(e.target.value
      .replace(/^ +|[^A-Za-z ]/g, '')
      .replace(/ +(\w*).*/, '')
    );
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (log && pass && log.length >= 6 && pass.length >= 6) {
      axios({
        method: 'post',
        url: `${URL_API}/login`,
        data: {
          login: log,
          password: pass,
        },
      })
        .then(({data}) => {
          if (!data.payload) {
            setShowModal(true);
            setTimeout(() => {
              setShowModal(false);
            }, 4000);
          } else {
            token = data.payload.token;
            dispatch(updateToken(token));
            navigate('/currencies');
          }
        })
        .catch(err => {
          console.error(err);
          dispatch(deleteToken());
        });
    } else {
      if (log === '' || log.length < 6) {
        setErrorLog(true);
      }
      if (pass === '' || pass.length < 6) {
        setErrorPass(true);
      }
    }
  };

  return (
    <Layout>
      <div className={style.auth__container}>
        {token ? (
            <Navigate to='/currencies' />
          ) : (
          <div className={style.auth__wrapper}>
            <form className={style.form} onSubmit={handleSubmit}>
              <legend className={style.form__title}>Вход в аккаунт</legend>
              <div className={style['form__input-wrapper']}>
                {errorLog && <span className={style.form__error}>
                  Не менее 6 символов
                </span>}
                <label htmlFor='login' className={style.form__label}>
                  Логин
                </label>
                <input
                  type='text'
                  className={style.form__input}
                  id='login'
                  value={log}
                  onChange={(e) => {
                    handleChangeLog(e);
                    setErrorLog(false);
                  }}
                />
              </div>

              <div className={style['form__input-wrapper']}>
                {errorPass && <span className={style.form__error}>
                  Не менее 6 символов
                </span>}
                <label htmlFor='password' className={style.form__label}>
                  Пароль
                </label>
                <input
                  type='password'
                  className={style.form__input}
                  id='password'
                  value={pass}
                  onChange={(e) => {
                    handleChangePass(e);
                    setErrorPass(false);
                  }}
                />
              </div>
              <button
                className={style.form__button}
                type='submit'>
                  Войти
              </button>
            </form>
          </div>
          )}
        {showModal && <ErrorAuth />}
      </div>
    </Layout>
  );
};
