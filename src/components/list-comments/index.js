import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Item from "../item";
import './style.css';

function ListComments({comments, renderComment, count, newСomment, t, children}){

  const cn = bem('ListComments');

  return (
    <div className={cn()}>
      <div className={cn('count')}>{t('comments.title')} ({count})</div>
      {comments.map(comment => {
        return (
          <div key={comment._id} className={cn('itemComment')} style={comment.level < 4 ? {marginLeft: comment.level*30} : {marginLeft: 3*30}}>
            {comment?.parent?._type !== 'formComment'
              ? renderComment(comment)
              : newСomment()
            }
          </div>
        )
      })}
      {children}
    </div>
  )
}

ListComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderComment: PropTypes.func,
  count: PropTypes.number,
  exists: PropTypes.bool
};

ListComments.defaultProps = {
  renderComment: (comment) => {},
}

export default memo(ListComments);
