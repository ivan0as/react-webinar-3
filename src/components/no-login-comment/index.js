import {memo, useRef} from "react";
import PropTypes from 'prop-types';
import useInit from "../../hooks/use-init";
import {cn as bem} from '@bem-react/classname';
import Item from "../item";
import './style.css';

function NoLoginComment({onSignIn, addCommentArticle, cancellationComment, selectId, t}){

  const cn = bem('NoLoginComment');

  const scrollAddComment = useRef(null);

  useInit(() => {
    scrollAddComment.current?.scrollIntoView({behavior: "smooth", block: "center"});
  }, [selectId]);

  return (
    <div ref={!addCommentArticle ? scrollAddComment : null} className={cn('')}><button className={cn('sign')} onClick={onSignIn}>{t('notLoginComments.signIn')}</button>{t('notLoginComments.messageLogin')} {!addCommentArticle && (<button className={cn('cancellation')} onClick={cancellationComment}>{t('comments.closeAnswer')}</button>)}</div>
  )
}

NoLoginComment.propTypes = {
  onSignIn: PropTypes.func
};

NoLoginComment.defaultProps = {
    onSignIn: () => {},
}

export default memo(NoLoginComment);