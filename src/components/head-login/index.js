import {memo} from "react";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import './style.css';

function HeadLogin({t, user, exit, token}){
  return (
    <div className='Head-login'>
      {Object.keys(user).length
        ? <div>
            <Link to='/profile'>
              <div>{user.profile.name}</div>
            </Link>
            <button onClick={() => exit(token)}>{t('login.exit')}</button>
          </div>
        : <Link to='/login'>
            <button>{t('login.signIn')}</button>
          </Link>

      }
    </div>
  )
}

HeadLogin.propTypes = {
  user: PropTypes.object,
  exit: PropTypes.func,
  token: PropTypes.string
};

HeadLogin.defaultProps = {
  exit: () => {}
}

export default memo(HeadLogin);
