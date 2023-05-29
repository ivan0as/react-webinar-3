import {memo, useCallback, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import HeadDown from '../../components/head-down';
import Navigation from "../../components/navigation";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  const [searchParams, setSearchParams] = useSearchParams();

  const pageQuery = Number(searchParams.get('page' || ''));

  useEffect(() => {
    if (!pageQuery) {
      store.actions.catalog.load();
    }
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Выбор страницы
    selectPage: useCallback(page => store.actions.catalog.load(page), [store]),
    // Переключение языка
    languageSwitcher: useCallback(() => store.actions.language.languageSwitcher(), [store]),
    // Очиста из store данных товара
    clearItemDetail: useCallback(() => store.actions.itemDetail.clear(), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} language={select.language.text} address={'item'}/>
    }, [callbacks.addToBasket, select.language]),
  };

  return (
    <PageLayout>
      <Head title={select.language.text.store}
        languageSwitcher={callbacks.languageSwitcher}
        languageSwitcherTitle={select.language.text.switchLanguage}
      />
      <HeadDown>
        <Navigation language={select.language.text}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}
                    language={select.language.text}/>
      </HeadDown>
      <List list={select.list} renderItem={renders.item} 
        selectPage={callbacks.selectPage} 
        count={select.count}
        clearItemDetail={callbacks.clearItemDetail}
        setSearchParams={setSearchParams}
        pageQuery={pageQuery}
      />
    </PageLayout>

  );
}

export default memo(Main);
