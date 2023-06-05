import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class Login extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      textError: '',
      waiting: false
    }
  }

  /**
   * Пользователь прошел авторизацию
    */

  loginTrue() {
    this.setState({
      ...this.getState(),
      waiting: false
    });
  }

  /**
   * Пользователь не прошел авторизацию
    */

  loginFalse(textError) {
    this.setState({
        ...this.getState(),
        textError,
        waiting: false
    });
  }

  /**
   * Сбросить состояние
    */

  errorReset() {
    this.setState({
        ...this.getState(),
        textError: '',
        waiting: false
    });
  }

  /**
   * Загрузка
    */

  loading() {
    this.setState({
      ...this.getState(),
      waiting: true
    });
  }
}

export default Login;
