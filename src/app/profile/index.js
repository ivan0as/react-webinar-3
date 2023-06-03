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
    user: state.user.user,
    token: state.user.token,
    waiting: state.user.waiting
  }));

  
  const callbacks = {
    // Выход
    exit: useCallback((token) => {
      store.actions.user.exit(token);
    }, [store]),
    profileInfo: useCallback(() => {
      if (location === 'profile') {
        return {
          user: select.user,
          waiting: select.waiting
        }
      }
    })
  }

  useInit(() => {
    if (!token && location === 'profile') {
      navigate('/login');
    }
  }, [select.user]);
  
  const {t} = useTranslate();

  const profileInfo = callbacks.profileInfo();

  return (
    <PageLayout>
      <HeadLogin t={t} user={select.user} exit={callbacks.exit} token={select.token}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={profileInfo.waiting}>
        <User t={t} profileInfo={profileInfo.user}/>
      </Spinner>  
    </PageLayout>
  );
}

export default memo(Profile);
