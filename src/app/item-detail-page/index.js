import {memo, useCallback} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemDetail from '../../components/item-detail';
import HeadDown from '../../components/head-down';
import Navigation from "../../components/navigation";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function ItemDetailPage() {

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    itemDetail: state.itemDetail.item,
    language: state.language.language
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение языка
    languageSwitcher: useCallback(() => store.actions.language.languageSwitcher(), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Подгрузка детальных данных о товаре
    loadItemDetail: useCallback((id) => store.actions.itemDetail.load(id), [store]),
    // Очиста из store данных товара
    clearItemDetail: useCallback(() => store.actions.itemDetail.clear(), [store])
  }

  return (
    <PageLayout>
      <Head title={select.itemDetail.title}
        languageSwitcher={callbacks.languageSwitcher}
        languageSwitcherTitle={select.language.text.switchLanguage}
      />
      <HeadDown>
        <Navigation language={select.language.text}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}
                    language={select.language.text}/>
      </HeadDown>
      <ItemDetail itemDetail={select.itemDetail} 
        onAdd={callbacks.addToBasket} 
        language={select.language.text}
        closeModal={callbacks.closeModal}
        loadItemDetail={callbacks.loadItemDetail}
        clearItemDetail={callbacks.clearItemDetail}
      />
    </PageLayout>

  );
}

export default memo(ItemDetailPage);
