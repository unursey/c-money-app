import style from './ErrorAuth.module.css';
import ReactDOM from 'react-dom';
import classNames from 'classnames';


export const ErrorAuth = () => ReactDOM.createPortal(
  <div
    className={classNames(style.topright, style.warning, style.doshow)}>
      Неверный логин или пароль
  </div>,
  document.getElementById('error-root'),
);

