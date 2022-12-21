import style from './Header.module.css';
import {SVG} from '../../UI/SVG/SVG';
import {Link, useNavigate} from 'react-router-dom';
import Layout from '../Layout';
import {useSelector, useDispatch} from 'react-redux';
import {deleteToken} from '../../store/tokenReducer';

export const Header = () => {
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={style.header}>
      <Layout>
        <div className={style.container}>
          <Link to='/'>
            <SVG
              iconName='logoIcon'
              className={style.logo}
              alt='Логотип'
              width={139}
              height={38}
            />
          </Link>
          {token && (
            <ul className={style.nav}>
              <li>
              </li>
              <li>
              </li>
              <Link to='/currencies'>Счета</Link>
              <Link to='/exchange'>Обмен</Link>
              <button
                className={style.exit}
                onClick={() => {
                  dispatch(deleteToken());
                  navigate('/');
                }}>
                Выйти
                <SVG iconName='exitIcon' className={style.exit} />
              </button>
            </ul>
          )}
        </div>
      </Layout>
    </div>
  );
};

