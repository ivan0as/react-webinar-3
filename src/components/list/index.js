import {memo, useEffect} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import './style.css';

function List(props){
  const { list, 
    renderItem, 
    pageSwitching, 
    pagesArrayCenter, 
    pagesArray,
    selectPage,
    count,
  } = props

  const store = useStore();

  useEffect(() => {
    if (renderItem().props.onAdd) {
      store.actions.itemDetail.clear();
      
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
        <Pagination pageSwitching={pageSwitching} pagesArrayCenter={pagesArrayCenter} pagesArray={pagesArray} selectPage={selectPage} count={count}/>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => {},
}

export default memo(List);
