import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function User({t, profileInfo}) {
  const cn = bem('User');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.profile')}</h2>
      <div className={cn('info-block')}>
        <div>{t('profile.name')}: <span className={cn('info')}>{profileInfo.profile?.name}</span></div>
        <div>{t('profile.numberPhone')}: <span className={cn('info')}>{profileInfo.profile?.phone}</span></div>
        <div>email: <span className={cn('info')}>{profileInfo.email}</span></div>
      </div>
    </div>
  );
}

User.propTypes = {
  renderUser: PropTypes.func
};

User.defaultProps = {
  renderUser: () => {},
}

export default memo(User);