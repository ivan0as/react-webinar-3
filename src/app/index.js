import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useStore from "../hooks/use-store";
import useSelector from "../hooks/use-selector";
import useInit from "../hooks/use-init";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.user,
    token: window.localStorage.getItem('token')
  }));

  useInit(() => {
    if (!Object.keys(select.user).length && select.token) {
      store.actions.user.auth(select.token);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile token={select.token}/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
