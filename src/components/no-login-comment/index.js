import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Item from "../item";
import './style.css';

function NoLoginComment({onSignIn, addCommentArticle, cancellationComment}){

  const cn = bem('NoLoginComment');

  return (
    <div className={cn('')}><button className={cn('sign')} onClick={onSignIn}>Войдите</button>, чтобы иметь возможность комментировать {!addCommentArticle && (<button className={cn('cancellation')} onClick={cancellationComment}>Отмена</button>)}</div>
  )
}

NoLoginComment.propTypes = {
  onSignIn: PropTypes.func
};

NoLoginComment.defaultProps = {
    onSignIn: () => {},
}

export default memo(NoLoginComment);