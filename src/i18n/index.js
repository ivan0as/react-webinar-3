class Translate {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = "ru";
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  getState() {
    return this.lang;
  }

  setState(newState) {
    this.services.api.setHeader("X-Lang", newState);
    this.lang = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.lang);
  }
}

export default Translate;
