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
   * @param code {Object}
   */
  onAddItem(code) {

    let sum = this.state.total

    let quantity = this.state.quantity

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          sum += item.price
          if (!item.count) {
            quantity++
          }
          return {
            ...item,
            count: item.count + 1 || 1,
          };
        }
        return item;
      })
    })

    this.state.total = sum
    this.state.quantity = quantity
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {

    let sum = this.state.total

    let quantity = this.state.quantity

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          quantity--
          sum-= (item.price * item.count)
          return {
            ...item,
            count: 0,
          };
        }
        return item;
      })
    })

    this.state.total = sum
    this.state.quantity = quantity
  };
}

export default Store;
