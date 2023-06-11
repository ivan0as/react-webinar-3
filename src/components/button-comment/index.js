import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ButtonComment({cancellationComment, addCommentArticle, t}) {
  const cn = bem('ButtonComment');
  return (
    <div className={cn()}>
      <button>{t('comments.addButton')}</button>
      {!addCommentArticle && (
        <button onClick={cancellationComment}>{t('comments.closeAnswer')}</button>
      )}
    </div>
  )
}

ButtonComment.propTypes = {
}

ButtonComment.defaultProps = {}

export default memo(ButtonComment);