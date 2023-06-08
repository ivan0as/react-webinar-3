import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ButtonComment({cancellationComment, addCommentArticle}) {
  const cn = bem('ButtonComment');
  return (
    <div className={cn()}>
      <button>Отправить</button>
      {!addCommentArticle && (
        <button onClick={cancellationComment}>Отмена</button>
      )}
    </div>
  )
}

ButtonComment.propTypes = {
}

ButtonComment.defaultProps = {}

export default memo(ButtonComment);