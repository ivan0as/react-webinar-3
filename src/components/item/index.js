import {memo, useState} from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link className={cn('link')} to={props.item._id ? `item/${props.item._id}` : '/'}>
        <div className={cn('title')}>
          {props.item.title}
        </div>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.language.add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
