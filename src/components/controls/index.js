import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import './style.css';

function Controls({setModalVisible, total, quantity}){
  return (
    <div className='Controls'>
      <div className='Controls-basket'>
        В корзине:
        {quantity > 0
        ? <span>{quantity} {plural(quantity, {one: 'товар', few: 'товара', many: 'товаров'})} / {total} ₽</span>
        : <span>пусто</span>
        }
        
      </div>
      <button onClick={() => setModalVisible(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setModalVisible: PropTypes.func
};

Controls.defaultProps = {
  setModalVisible: () => {}
}

export default React.memo(Controls);
