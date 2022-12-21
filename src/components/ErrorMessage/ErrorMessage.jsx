import style from './ErrorMessage.module.css';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export const ErrorMessage = ({message}) => {
  let mess = '';

  if (message === 'Unknown currency code') {
    mess = 'Неверный валютный код.';
  } else
  if (message === 'Not enough currency') {
    mess = 'Недостаточно средств на счете.';
  } else
  if (message === 'Invalid amount') {
    mess = 'Неверная сумма перевода.';
  } else
  if (message === 'Invalid account from') {
    mess = 'Неверный счёт списания.';
  } else
  if (message === 'Invalid account to') {
    mess = 'Неверный счёт зачисления.';
  } else
  if (message === 'Overdraft prevented') {
    mess = 'Неверная сумма списания, проверьте баланс.';
  } else {
    mess = 'Что-то пошло не так.';
  }

  return ReactDOM.createPortal(
    <div
      className={classNames(style.topright, style.warning, style.doshow)}>
      {mess}
    </div>,
    document.getElementById('error-root'),
  );
};
