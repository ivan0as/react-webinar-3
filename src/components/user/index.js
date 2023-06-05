import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function User({renderUser}) {
  const cn = bem('User');

  return (
    <div className={cn()}>
      {renderUser()}
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