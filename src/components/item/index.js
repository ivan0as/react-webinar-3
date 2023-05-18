import React, { useState } from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props){

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },

    onAddItemBasket: (e) => {
      e.stopPropagation();
      props.onAddItemBasket(props.item);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <div className='Item-price'>{props.item.price} ₽</div>
        {props.item.count && (
          <div className='Item-count'>{props.item.count} шт</div>
        )}
        {props.onDelete && (
          <button onClick={callbacks.onDelete}>
            Удалить
          </button>
        )}
        {props.onAddItemBasket && (
          <button onClick={callbacks.onAddItemBasket}>
            Добавить
          </button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(Item);
