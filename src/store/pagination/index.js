import StoreModule from "../module";

class Pagination extends StoreModule {

  initState() {
    return {
      pagesArrayCenter: [],
      pagesArray: []
    }
  }

  loadPagesStart(lastPageNumber) {
    this.setState({
       ...this.getState(),
       pagesArrayCenter: [
        {
          number: 2,
          selected: false
        },
        {
          number: 3,
          selected: false
        }
      ],
      pagesArray: [
        {
          number: 1,
          selected: true
        },
        {
          number: 2,
        },
        {
          number: 3,
        },
        {
          number: lastPageNumber
        },
      ]
    }, 'Подгрузка погинации');
  }

  /**
   * Переключение страниц
   * @param page Страница переключатель
   * @param lastPageNumber Последняя страница
   */
  pageSwitching(pageNumber, lastPageNumber) {

    let newPagesArrayCenter = [];
    if (pageNumber === 1) {
      for (let i = 2; i < 4; i++) {
        newPagesArrayCenter.push({
          number: i
        })
      }
    } else if (pageNumber === lastPageNumber) {
      for (let i = pageNumber-2; i < pageNumber; i++) {
        newPagesArrayCenter.push({
          number: i
        })
      }
    } else if (pageNumber > 2 && pageNumber < lastPageNumber-1) {
      for (let i = pageNumber-1; i < pageNumber+2; i++) {
        newPagesArrayCenter.push({
          number: i
        })
      }
    } else if (pageNumber <= 2) {
      for (let i = pageNumber; i < pageNumber+2; i++) {
        newPagesArrayCenter.push({
          number: i
        })
      }
    } else if (pageNumber >= lastPageNumber-1) {
      for (let i = pageNumber-1; i < pageNumber+1; i++) {
        newPagesArrayCenter.push({
          number: i
        })
      }
    }

    const newPagesArray = [
      {
        number: 1,
        selected: true
      },
      ...newPagesArrayCenter,
      {
        number: lastPageNumber
      },
    ]

    this.setState({
      ...this.getState(),
      pagesArrayCenter: newPagesArrayCenter,
      pagesArray: newPagesArray.map(page => {
        if (page.number === pageNumber) {
          return {
            ...page,
            selected: true
          }
        }
        return page.selected ? {...page, selected: false} : page;
      })
    }, 'Переключение страниц');
  }
}

export default Pagination;