import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Total from './components/total';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  
  let total = store.getState().total;

  let quantity = store.getState().quantity;

  const [modalVisible, setModalVisible] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.onAddItem(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls setModalVisible={setModalVisible} total={total} quantity={quantity}/>
      <List list={list}
            onAddItem={callbacks.onAddItem}/>
      {modalVisible && (
        <Modal setModalVisible={setModalVisible} title='Корзина'>
          <List list={list}
            onDeleteItem={callbacks.onDeleteItem}/>
          <Total total={total}/>
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
