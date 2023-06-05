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
import User from '../../components/user';
import HeadLogin from '../../components/head-login';
import Spinner from "../../components/spinner";

function Profile({token, location}) {

  const store = useStore();

  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.login.user,
    token: state.login.token,
    waiting: state.user.waiting,
    profile: state.user.user
  }));

  
  const callbacks = {
    // Выход
    exit: useCallback((token) => {
      store.actions.login.exit(token);
    }, [store])
  }

  useInit(() => {
    if (!token && location === 'profile') {
      navigate('/login');
    }
  }, [select.user]);

  useInit(() => {
    store.actions.user.load();
  }, []);
  
  const {t} = useTranslate();

  return (
    <PageLayout>
      <HeadLogin t={t} user={select.user} exit={callbacks.exit} token={select.token}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <User t={t} profileInfo={select.profile}/>
      </Spinner>  
    </PageLayout>
  );
}

export default memo(Profile);
