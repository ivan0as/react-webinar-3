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
      token: '',
      user: {},
      textError: '',
      waiting: false
    }
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param login логин пользователя
   * @param password Пароль пользователя
   */
  async signIn(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const response = await fetch('/api/v1/users/sign', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login, password}),
    });

    if (response.ok) {
      const json = await response.json();
      window.localStorage.setItem('token', json.result.token);
      this.setState({
        ...this.getState(),
        token: json.result.token,
        user: json.result.user,
        waiting: false
      }, 'Загружены данные пользователя');
    } else {
      this.setState({
        ...this.getState(),
        textError: response.statusText,
      }, 'Ошибка');
    }
  }

  async auth(token) {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    const response = await fetch('/api/v1/users/self', {
      headers: {
          "Content-Type": "application/json",
          "X-Token": token
      }
    });

    const json = await response.json();
    
    this.setState({
      ...this.getState(),
      user: json.result,
      token,
      waiting: false
    }, 'Загружены данные пользователя');
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
