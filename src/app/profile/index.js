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
import Spinner from "../../components/spinner";

function Profile({token}) {

  const store = useStore();

  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.user.user,
    token: state.user.token,
    waiting: state.user.waiting
  }));

  
  const callbacks = {
    // Выход
    exit: useCallback((token) => {
      store.actions.user.exit(token);
    }, [store]),
  }

  useInit(() => {
    if (!token) {
      navigate('/login');
    }
  }, [select.user]);
  
  const {t} = useTranslate();

  return (
    <PageLayout>
      <Head title={t('title')} user={select.user} t={t} exit={callbacks.exit} token={select.token}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <User t={t} user={select.user}/>
      </Spinner>  
    </PageLayout>
  );
}

export default memo(Profile);
