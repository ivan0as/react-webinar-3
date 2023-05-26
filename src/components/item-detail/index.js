import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import useStore from "../../store/use-store";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ItemDetail({itemDetail, onAdd, language}) {

  const cn = bem('ItemDetail');

  const store = useStore();

  const {id} = useParams()

  useEffect(() => {
    store.actions.itemDetail.load(id);
    store.actions.modals.close()
  }, []);

  const callbacks = {
    onAdd: (id) => onAdd(id)
  }

  return (
    <div className={cn()}>
      <div className={cn('section')}>{itemDetail.description}</div>
      <div className={cn('section')}>{language.country}:<span className={cn('item-info')}>{itemDetail.madeIn?.title} ({itemDetail.madeIn?.code})</span></div>
      <div className={cn('section')}>{language.category}:<span className={cn('item-info')}>{itemDetail.category?.title}</span></div>
      <div className={cn('section')}>{language.yearIssue}:<span className={cn('item-info')}>{itemDetail.edition}</span></div>
      <div className={`${cn('section')} ${cn('price')}`}>{language.price}:<span className={cn('item-info')}>{numberFormat(itemDetail.price)} ₽</span></div>
      <button className={cn('btn')} onClick={() => callbacks.onAdd(id)}>{language.add}</button>
    </div>
  );
}

ItemDetail.propTypes = {
  onAdd: propTypes.func,
};

ItemDetail.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemDetail);
