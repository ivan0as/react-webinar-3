import {memo} from "react";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import './style.css';

function Head({t, title, user, exit, token, children}){
  return (
    <div className='Head'>
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
      <div className='Head-place'>
        <div>
          <h1 >{title}</h1>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
