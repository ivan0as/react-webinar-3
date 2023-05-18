import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   * @param item {Object}
   */
  onAddItemBasket(item) {
    if (this.state.basketList.find(basketItem => basketItem.code === item.code)) {
      this.setState({
        ...this.state,
        basketList: this.state.basketList.map(basketItem => {
          if (item.code === basketItem.code) {
            return {
              ...basketItem,
              count: basketItem.count + 1
            }
          }
          return basketItem
        })
      })
    } else {
      this.setState({
        ...this.state,
        basketList: [...this.state.basketList, {
          code: item.code, 
          title: item.title, 
          price: item.price, 
          count: 1
        }]
      })
    }

  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      basketList: this.state.basketList.filter(item => item.code !== code)
    })
  };
}

export default Store;
