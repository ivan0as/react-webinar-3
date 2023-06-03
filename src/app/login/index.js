import {memo, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/login-form';
import HeadLogin from '../../components/head-login';
import Spinner from "../../components/spinner";

function Login() {

  const store = useStore();

  const navigate = useNavigate();

  const select = useSelector(state => ({
    textError: state.user.textError,
    user: state.user.user,
    waiting: state.user.waiting
  }));
  
  const callbacks = {
    // Вход
    signIn: useCallback((login, password) => {
      store.actions.user.signIn(login, password);
    }, [store]),
  }

  useInit(() => {
    if (Object.keys(select.user).length) {
      navigate('/profile');
    }
    store.actions.user.errorReset();
  }, [select.user]);
  
  const {t} = useTranslate();

  return (
    <PageLayout>
      <HeadLogin t={t} user={select.user} exit={callbacks.exit} token={select.token}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <LoginForm t={t} signIn={callbacks.signIn} textError={select.textError}/>
      </Spinner> 
    </PageLayout>
  );
}

export default memo(Login);
