import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function MyProfile({t, profileInfo}) {
  const cn = bem('MyProfile');

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

MyProfile.propTypes = {
  profileInfo: PropTypes.shape({
    profile: PropTypes.object,
    email: PropTypes.string
  }).isRequired,
  t: PropTypes.func
};

MyProfile.defaultProps = {
  t: (text) => text
}

export default memo(MyProfile);