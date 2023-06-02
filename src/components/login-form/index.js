import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm({t, signIn, textError}) {
  const cn = bem('LoginForm');

  const [values, setValues] = useState({
    login: '',
    password: ''
  })

  const callbacks = {
    signIn: (e) => {
      e.preventDefault();
      if (values.login && values.password) {
        signIn(values.login, values.password);
      } else {
        alert('Логин или пароль пустые');
      }
    }
  };

  const onChange = (e) => {
    const fieldName = e.target.name;
		setValues({...values, [fieldName]: e.target.value});
  };

  return (
    <div className={cn()}>
      <form className={cn('form')} onSubmit={callbacks.signIn}>
        <div className={cn('title')}>{t('sign')}</div>
        <label className={cn('label')}>{t('login.login')}<input value={values.login} name="login" onChange={onChange}/></label>
        <label className={cn('label')}>{t('login.password')}<input type="password" value={values.password} name="password" onChange={onChange}/></label>
        <div className={cn('error')}>{textError}</div>
        <button type="submit" className={cn('sign')}>{t('login.signIn')}</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func,
  signIn: PropTypes.func,
  textError: PropTypes.string
};

LoginForm.defaultProps = {
  t: (text) => text,
  signIn: () => {}
}

export default memo(LoginForm);