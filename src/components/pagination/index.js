import {memo, useCallback, useState, useEffect} from 'react';
import propTypes, { number } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { lastPage } from '../../utils';
import useStore from "../../store/use-store";
import './style.css';

function Pagination({pageSwitching, selectPage, count, pagesArrayCenter, pagesArray}) {

  const store = useStore();

  const cn = bem('pagination');

  useEffect(() => {
    if (count > 0) {
      store.actions.pagination.loadPagesStart(lastPageNumber);
    }
  }, [count])

  const callbacks = {
    pageDefinition: (page) => {
      selectPage((page - 1) * 10);
      pageSwitching(page, lastPageNumber)
    }
  };

  const lastPageNumber = lastPage(count) || 0;

  return (
    <div className={cn()}>
      <button className={cn('page' + (pagesArray[0]?.selected ? ' page-selected' : ''))} onClick={() => callbacks.pageDefinition(1)}>1</button>
      {pagesArrayCenter[0]?.number >= 3 && (
        <span className={cn('ellipsis')}>...</span>
      )}
      {pagesArray.map(page=> {
        if (page.number !== 1 && page.number !== lastPageNumber) {
          return (
            <button key={page.number} className={cn('page' + (page.selected ? ' page-selected' : ''))} onClick={() => callbacks.pageDefinition(page.number)}>{page.number}</button>
          )
        }
      })}
      {pagesArrayCenter[pagesArrayCenter.length-1]?.number <= lastPageNumber-2 && (
        <span className={cn('ellipsis')}>...</span>
      )}
      <button className={cn('page' + (pagesArray[pagesArray.length-1]?.selected ? ' page-selected' : ''))} onClick={() => callbacks.pageDefinition(lastPageNumber)}>{lastPageNumber}</button>
    </div>
  )
}

Pagination.propTypes = {
  pagesArrayCenter: propTypes.arrayOf(propTypes.shape({
    number: propTypes.number
  })).isRequired,
}

Pagination.defaultProps = {
  selectPage: () => {},
  lastPage: () => {},
  pageSwitching: () => {}
}

export default memo(Pagination);
