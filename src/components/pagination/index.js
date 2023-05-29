import {memo, useCallback, useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import propTypes, { number } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { lastPage } from '../../utils';
import './style.css';

function Pagination({selectPage, count, setLoading, setSearchParams, pageQuery}) {

  const cn = bem('pagination');

  const lastPageNumber = lastPage(count) || 0;

  const [pagesNumber, setPagesNumber] = useState([{number: 1, selected: true}, {number: 2}, {number: lastPageNumber}]);

  useEffect(() => {
    setPagesNumber(
      [...pagesNumber], pagesNumber[2].number = lastPageNumber
    )
    if (pageQuery) {
      callbacks.pagesNumberChange(pageQuery);
    }
  }, [lastPageNumber]);

  useEffect(() => {
    if (pageQuery) {
      selectPage((pageQuery - 1) * 10);
    }
  }, []);


  const callbacks = {
    pageDefinition: (pageNumber) => {
      setSearchParams({page: pageNumber});
      selectPage((pageNumber - 1) * 10);
      callbacks.pagesNumberChange(pageNumber);
      setLoading(false);
    },
    pagesNumberChange: (pageNumber) => {
      pagesNumber.map(page => {
        if (pageNumber !== 1 && pageNumber !== lastPageNumber && (page.number === pageNumber || page.number === pageNumber+1 || page.number === pageNumber-1)) {
          setPagesNumber([
            {number:1 , selected: false},
            {number:pageNumber , selected: true},
            {number:lastPageNumber , selected: false},
          ])
        } else if (pageNumber === 1 && page.number === pageNumber) {
          setPagesNumber([
            {number:1 , selected: true},
            {number:2 , selected: false},
            {number:lastPageNumber , selected: false},
          ])
        } else if (pageNumber === lastPageNumber && page.number === pageNumber) {
          setPagesNumber([
            {number:1 , selected: false},
            {number:lastPageNumber-1 , selected: false},
            {number:lastPageNumber , selected: true},
          ])
        }
      })
    }
  };

  return (
    <div className={cn()}>
      <button className={cn('page' + (pagesNumber[0]?.selected ? ' page-selected' : ''))} onClick={() => callbacks.pageDefinition(1)}>1</button>
      {pagesNumber[1]?.number > 3 && (
        <span className={cn('ellipsis')}>...</span>
      )}
      {pagesNumber[1]?.number >= 3 && (
        <button className={cn('page')} onClick={() => callbacks.pageDefinition(pagesNumber[1]?.number-1)}>{pagesNumber[1]?.number-1}</button>
      )}
      <button className={cn('page' + (pagesNumber[1]?.selected ? ' page-selected' : ''))} onClick={() => callbacks.pageDefinition(pagesNumber[1]?.number)}>{pagesNumber[1]?.number}</button>
      {pagesNumber[1]?.number <= lastPageNumber-2 && (
        <button className={cn('page')} onClick={() => callbacks.pageDefinition(pagesNumber[1]?.number+1)}>{pagesNumber[1]?.number+1}</button>
      )}
      {pagesNumber[1]?.number < lastPageNumber-2 && (
        <span className={cn('ellipsis')}>...</span>
      )}
      <button className={cn('page' + (pagesNumber[2]?.selected ? ' page-selected' : ''))} onClick={() => callbacks.pageDefinition(lastPageNumber)}>{lastPageNumber}</button>
    </div>
  )
}

Pagination.propTypes = {
  count: propTypes.number,
  selectPage: propTypes.func,
  lastPage: propTypes.func,
}

Pagination.defaultProps = {
  selectPage: () => {},
  lastPage: () => {},
}

export default memo(Pagination);
