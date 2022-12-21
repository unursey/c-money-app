import style from './ErrorPage.module.css';
import Layout from '../Layout';

export const ErrorPage = () => (
  <Layout>
    <div className={style.container}>
      <h2 className={style.title}>
        Ошибка 404.
      </h2>
    </div>

  </Layout>
);
