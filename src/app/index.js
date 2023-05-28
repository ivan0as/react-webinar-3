import {useCallback, useContext, useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import ItemDetailPage from "./item-detail-page";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <BrowserRouter>
        {activeModal === 'basket' && <Basket/>}
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/item/:id' element={<ItemDetailPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
