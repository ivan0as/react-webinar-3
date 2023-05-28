import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import Loading from '../loading';
import './style.css';

function ItemDetail({itemDetail, onAdd, language, closeModal, loadItemDetail}) {

  const cn = bem('ItemDetail');

  const {id} = useParams();

  useEffect(() => {
    loadItemDetail(id);
    closeModal();
  }, [id]);

  const callbacks = {
    onAdd: (id) => onAdd(id)
  }

  return (
    <div className={cn()}>
      {Object.keys(itemDetail).length
        ?
          <>
            <div className={cn('section')}>{itemDetail.description}</div>
            <div className={cn('section')}>{language.country}:<span className={cn('item-info')}>{itemDetail.madeIn?.title} ({itemDetail.madeIn?.code})</span></div>
            <div className={cn('section')}>{language.category}:<span className={cn('item-info')}>{itemDetail.category?.title}</span></div>
            <div className={cn('section')}>{language.yearIssue}:<span className={cn('item-info')}>{itemDetail.edition}</span></div>
            <div className={`${cn('section')} ${cn('price')}`}>{language.price}:<span className={cn('item-info')}>{numberFormat(itemDetail.price)} ₽</span></div>
            <button className={cn('btn')} onClick={() => callbacks.onAdd(id)}>{language.add}</button>
          </>
        : <Loading />
      }
    </div>
  );
}

ItemDetail.propTypes = {
  onAdd: propTypes.func,
  closeModal: propTypes.func
};

ItemDetail.defaultProps = {
  onAdd: () => {},
  closeModal: () => {}
}

export default memo(ItemDetail);
