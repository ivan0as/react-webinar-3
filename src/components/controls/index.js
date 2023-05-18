import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import './style.css';

function Controls({setPopupBasketVisible, total, amount}){
  return (
    <div className='Controls'>
      <div className='Controls-basket'>
        В корзине:
        {amount > 0
        ? <span>{amount} {plural(amount, {one: 'товар', few: 'товара', many: 'товаров'})} / {total} ₽</span>
        : <span>пусто</span>
        }
        
      </div>
      <button onClick={() => setPopupBasketVisible(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setPopupBasketVisible: PropTypes.func
};

Controls.defaultProps = {
  setPopupBasketVisible: () => {}
}

export default React.memo(Controls);
