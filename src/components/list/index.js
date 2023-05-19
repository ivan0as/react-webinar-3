import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props){
  return (
    <div className='List'>{
      props.list.map(item => {
        if (props.onAddItem) {
          return (
            <div key={item.code} className='List-item'>
              <Item item={item} onAddItem={props.onAddItem}/>
            </div>
          )
        } else if (props.onDeleteItem && item.count > 0) {
          return (
            <div key={item.code} className='List-item'>
              <Item item={item} onDelete={props.onDeleteItem}/>
            </div>
          )
        }
      })}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    count: PropTypes.number,
  })).isRequired,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default React.memo(List);
