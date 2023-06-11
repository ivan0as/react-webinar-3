import translate from "../i18n/translate";
import useServices from "./use-services";
import {useLayoutEffect, useMemo, useState, useCallback} from "react";
import shallowequal from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {

  const store = useServices().translate;

  const [lang, setLangg] = useState(store.getState());

  const t = useCallback((text, number) => translate(lang, text, number), [lang]);

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return store.subscribe(() => {
      const newState = store.getState();
      setLangg(prevState => shallowequal(prevState, newState) ? prevState : newState);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);


  const setLang = (e) => {
    store.setState(e);
  }

  return { lang, setLang, t };
}
