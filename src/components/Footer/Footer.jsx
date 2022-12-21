import style from './Footer.module.css';
import {SVG} from '../../UI/SVG/SVG';
import {Link} from 'react-router-dom';
import Layout from '../Layout';

export const Footer = () => (

  <footer className={style.footer}>
    <Layout>
      <div className={style.container}>
        <Link to="/">
          <SVG
            iconName="logoIcon"
            className={style.logo}
            alt="Логотип"
            width={139}
            height={38}
          />
        </Link>
        <p className={style.copy}>&copy; C-Money, 2022</p>
      </div>
    </Layout>
  </footer>

);
