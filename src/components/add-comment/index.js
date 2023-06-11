import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function AddComment({t, children}) {
  const cn = bem('AddComment');
  return (
    <div className={cn()}>
      <div className={cn('header')}>{t('comments.answerTitle')}</div>
      <div className={cn('children')}>
        {children}
      </div>
    </div>
  )
}

AddComment.propTypes = {
  label: PropTypes.node,
  error: PropTypes.node,
  children: PropTypes.node,
}

AddComment.defaultProps = {}

export default memo(AddComment);