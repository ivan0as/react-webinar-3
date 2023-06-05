import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class User extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: window.localStorage.getItem('token') || '',
      user: {},
      waiting: false
    }
  }

  async load() {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    const token = window.localStorage.getItem('token');

    try {
      const response = await fetch('/api/v1/users/self', {
        headers: {
            "Content-Type": "application/json",
            "X-Token": encodeURIComponent(token)
        }
      });

      const json = await response.json();

      this.setState({
        ...this.getState(),
        user: json.result,
        token,
        waiting: false
      }, 'Загружены данные пользователя');

    } catch(e) {
      this.setState({
        user: {},
        waiting: false
      });
    }
  }
}

export default User;
