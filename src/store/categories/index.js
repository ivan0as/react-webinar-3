import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class Categories extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: []
    }
  }

  /**
   * Загрузка категорий
   */
  async loadCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();

    let categories = json.result.items.map(category => {
      return {'value': category._id, 'title': category.title, 'parent': category.parent};
    });

    
    categories.unshift({'value': 0, 'title': 'Все', 'parent': null})

    const recursion = (valueId, title, initialValue, initialParent) => {
      const findCategory = categories.find(({value}) => value === valueId);

      if (!findCategory?.parent) {
        return {'value': initialValue, 'title': title, 'parent': initialParent};
      };

      title = ' - ' + title;
      return recursion(findCategory.parent._id, title, initialValue, initialParent);
    }

    categories = categories.map(category => {
      return recursion(category.value, category.title, category.value, category.parent);
    });

    let arr = categories.slice();

    for (let i = 0; i < arr.length; i++) {
      if (arr[i]?.parent) {
        const findNumberParent = arr.findIndex(({value}) => value === arr[i].parent._id);
        if (arr[i].parent._id !== arr[i-1].parent?._id && arr[i].parent._id !== arr[i-1].value) {

          let separatorNumber = 0

          for (let j = findNumberParent+1; j < i; j++) {
            if (arr[j].parent?._id !== arr[findNumberParent].value) {
              separatorNumber = j-1
              break;
            }
          }

          const firstArray = arr.slice(0,separatorNumber+1);
          const secondArray = arr.slice(separatorNumber+1);

          const findIndex = secondArray.findIndex(({value}) => value === arr[i].value);

          secondArray.splice(findIndex, 1);

          arr = [...firstArray, arr[i], ...secondArray];
        }
      }
    }

    this.setState({
      ...this.getState(),
      categories: arr
    }, 'Загружены категории');
  }
}

export default Categories;
