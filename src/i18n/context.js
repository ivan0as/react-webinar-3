import {createContext} from "react";

/**
 * @type {React.Context<{}>}
 */
export const I18nContext = createContext({});

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
export function I18nProvider({children}) {

  return (
    <I18nContext.Provider>
      {children}
    </I18nContext.Provider>
  );
}
