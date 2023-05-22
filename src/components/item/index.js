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

    onAddItem: (e) => {
      e.stopPropagation();
      props.onAddItem(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <div className='Item-price'>{props.item.price.toLocaleString()} ₽</div>
        {props.onDelete && (
          <>
            <div className='Item-count'>{props.item.count} шт</div>
            <button onClick={callbacks.onDelete}>
              Удалить
            </button>
          </>
        )}
        {props.onAddItem && (
          <button onClick={callbacks.onAddItem}>
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
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(Item);
