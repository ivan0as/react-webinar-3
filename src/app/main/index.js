import {memo, useCallback, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import ItemDetail from '../../components/item-detail';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesArrayCenter: state.pagination.pagesArrayCenter,
    pagesArray: state.pagination.pagesArray,
    itemDetail: state.itemDetail.item,
    language: state.language.language
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Выбор страницы
    selectPage: useCallback(page => store.actions.catalog.load(page), [store]),
    // Переключение страниц
    pageSwitching: useCallback((page, lastPageNumber) => store.actions.pagination.pageSwitching(page, lastPageNumber), [store]),
    // Переключение языка
    languageSwitcher: useCallback(() => store.actions.language.languageSwitcher(), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} language={select.language.text}/>
    }, [callbacks.addToBasket, select.language]),
  };

  return (
    <PageLayout>
      <Head title={select.itemDetail.title ? select.itemDetail.title : select.language.text.store}
        languageSwitcher={callbacks.languageSwitcher}
        languageSwitcherTitle={select.language.text.switchLanguage}
      />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}
                  language={select.language.text}/>
      <Routes>
        <Route path='/' element={<List list={select.list} renderItem={renders.item} 
        pageSwitching={callbacks.pageSwitching}
        pagesArrayCenter={select.pagesArrayCenter} 
        pagesArray={select.pagesArray}
        selectPage={callbacks.selectPage} 
        count={select.count}
        />}/>
        <Route path='/item/:id' element={<ItemDetail itemDetail={select.itemDetail} onAdd={callbacks.addToBasket} language={select.language.text}/>} />
      </Routes>
    </PageLayout>

  );
}

export default memo(Main);
