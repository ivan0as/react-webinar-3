import {memo, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import Loading from '../loading'
import Pagination from '../pagination';
import './style.css';

function List(props){
  const { list, 
    renderItem, 
    selectPage,
    count,
    clearItemDetail,
    setSearchParams, 
    pageQuery
  } = props;

  const [loading, setLoading] = useState(() =>{
    if (renderItem().props.onAdd) {
      return false
    } else {
      return true
    }
  })

  useEffect(() => {
    if (renderItem().props.onAdd) {
      clearItemDetail()
    }
  }, []);

  useEffect(() => {
    if (list.length && renderItem().props.onAdd && count > 0) {
      setLoading(true)
    }
  }, [list]);

  return (
    <div className='List'>
      {loading
        ?
          <>
            {list.map(item =>
              <div key={item._id} className='List-item'>
                {renderItem(item)}
              </div>
            )}
          </>
        : <Loading/>
      }
      {renderItem().props.onAdd && (
        <Pagination selectPage={selectPage} count={count} setLoading={setLoading} setSearchParams={setSearchParams} pageQuery={pageQuery}/>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  clearItemDetail: PropTypes.func,
  setSearchParams: PropTypes.func
};

List.defaultProps = {
  renderItem: (item) => {},
  clearItemDetail: () => {},
  setSearchParams: () => {}
}

export default memo(List);
