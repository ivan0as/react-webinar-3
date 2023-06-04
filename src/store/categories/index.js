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

    for (let i = 0; i < categories.length; i++) {
      if (categories[i]?.parent) {
        const findNumberParent = categories.findIndex(({value}) => value === categories[i].parent._id);
        if (categories[i].parent._id !== categories[i-1].parent?._id && categories[i].parent._id !== categories[i-1].value) {

          let separatorNumber = 0

          for (let j = findNumberParent+1; j < i; j++) {
            if (categories[j].parent?._id !== categories[findNumberParent].value) {
              separatorNumber = j-1
              break;
            }
          }

          const firstArray = categories.slice(0,separatorNumber+1);
          const secondArray = categories.slice(separatorNumber+1);

          const findIndex = secondArray.findIndex(({value}) => value === categories[i].value);

          secondArray.splice(findIndex, 1);

          categories = [...firstArray, categories[i], ...secondArray];
        }
      }
    }

    this.setState({
      ...this.getState(),
      categories
    }, 'Загружены категории');
  }
}

export default Categories;
