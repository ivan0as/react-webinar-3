import StoreModule from "../module";

class ItemDetail extends StoreModule {

  initState() {
    return {
      item: {}
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       item: json.result,
    }, 'Загружен товар из АПИ');
  }

  clear() {
    this.setState({
      ...this.getState(),
      item: [],
    }, 'Очистка товара');
  }
}

export default ItemDetail;
