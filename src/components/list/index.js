import {memo, useEffect} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import Pagination from '../../components/pagination';
import './style.css';

function List(props){
  const { list, 
    renderItem, 
    selectPage,
    count,
    clearItemDetail
  } = props

  useEffect(() => {
    if (renderItem().props.onAdd) {
      clearItemDetail()
      
    }
  }, [])

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item._id} className='List-item'>
          {renderItem(item)}
        </div>
      )}
      {renderItem().props.onAdd && (
        <Pagination selectPage={selectPage} count={count}/>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  clearItemDetail: PropTypes.func
};

List.defaultProps = {
  renderItem: (item) => {},
  clearItemDetail: () => {}
}

export default memo(List);
