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

  /**
   * Установка параметров и загрузка списка товаров
   * @param login логин пользователя
   * @param password Пароль пользователя
   */

  async signIn(login, password) {

    const response = await fetch('/api/v1/users/sign', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login, password}),
    });

    const json = await response.json();

    if (!json.error) {
      window.localStorage.setItem('token', json.result.token);
      this.setState({
        ...this.getState(),
        token: json.result.token,
        user: json.result.user,
      }, 'Загружены данные пользователя');
    } else {
      this.store.actions.login.loginFalse(json.error.data.issues[0].message);
    }
  }

  async auth() {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await fetch('/api/v1/users/self', {
        headers: {
            "Content-Type": "application/json",
            "X-Token": encodeURIComponent(token)
        }
      });
  
      const json = await response.json();
  
      if (!json.error) {
        this.setState({
          ...this.getState(),
          user: json.result,
          token,
          waiting: false
        }, 'Загружены данные пользователя');
      } else {
        localStorage.removeItem('token');
      
        this.setState({
          ...this.getState(),
          token: '',
          user: {},
          waiting: false
        }, 'Автоматическая авторизация не пройдена');
      }
    }
  }

  async exit(token) {
    await fetch('/api/v1/users/sign', {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "X-Token": token
      }
    });

    localStorage.removeItem('token');
    
    this.setState({
      ...this.getState(),
      token: '',
      user: {},
    }, 'Выход из аккаунта');
  }
}

export default User;
