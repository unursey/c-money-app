import {Route, Routes, Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';
import Header from './components/Header';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Currencies from './components/Currencies';
import Account from './components/Account';
import Exchange from './components/Exchange';
import ErrorPage from './components/ErrorPage';

const App = () => {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));

  return (
    <Routes>
      <Route
        path='*'
        element={
          <>
            <Header />
            <Routes>
              <Route path='/' element={<Navigate to='/currencies' />}/>
              <Route path='/auth' element={<Auth />}/>
              <Route path='/currencies' element={<Currencies />}/>
              <Route path='/account/:id' element={<Account />} />
              <Route path='/exchange' element={<Exchange />}/>
              <Route path='*' element={<ErrorPage />} />
            </Routes>
            <Footer />
          </>
        }
      />
    </Routes>
  );
};

export default App;
