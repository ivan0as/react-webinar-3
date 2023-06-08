import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ItemComment({comment, selectComment, newСomment}) {
  const cn = bem('Comment');
  const date = new Date(comment?.dateCreate);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric'
  }
  return (
    <div className={cn()} style={{marginLeft: comment.level*30}}>
      <div className={cn('top')}>
        <div className={cn('profile')}>{comment?.author?.profile?.name}</div>
        <div className={cn('date')}>{date.toLocaleString("ru", options)}</div>
      </div>
      <div className={cn('text')}>{comment?.text}</div>
      <button className={cn('answer')} onClick={() => selectComment(comment._id)}>Ответить</button>
      {comment?.selected
        ? newСomment()
        : ''
      }
    </div>
  );
}

ItemComment.propTypes = {
  comment: PropTypes.object.isRequired,
  selectComment: PropTypes.func
};

ItemComment.defaultProps = {
  selectComment: (id) => {},
}

export default memo(ItemComment);