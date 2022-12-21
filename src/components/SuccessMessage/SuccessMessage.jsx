import style from './SuccessMessage.module.css';
import ReactDOM from 'react-dom';
import classNames from 'classnames';


export const SuccessMessage = () => ReactDOM.createPortal(
  <div
    className={classNames(style.topright, style.warning, style.doshow)}>
      Перевод прошел успешно!
  </div>,
  document.getElementById('error-root'),
);

