import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Total({total}){
  return (
    <div className='total'>
        <span>Итого</span>
        <span>{total} ₽</span>
    </div>
  )
}

Total.propTypes = {
  total: PropTypes.number,
}

export default React.memo(Total);