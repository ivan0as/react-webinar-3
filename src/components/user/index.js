import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function User({t, user}) {
  const cn = bem('User');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.profile')}</h2>
      <div className={cn('info-block')}>
        <div>{t('profile.name')}: <span className={cn('info')}>{user.profile?.name}</span></div>
        <div>{t('profile.numberPhone')}: <span className={cn('info')}>{user.profile?.phone}</span></div>
        <div>email: <span className={cn('info')}>{user.email}</span></div>
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.object,
    email: PropTypes.string
  }).isRequired,
  t: PropTypes.func
};

User.defaultProps = {
  t: (text) => text
}

export default memo(User);