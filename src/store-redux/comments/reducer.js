// Начальное состояние
const initialState = {
  data: [],
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: [], waiting: true, waitingComment: true, count: 0, addCommentArticle: true, selectId: ''};

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false, waitingComment: false, count: action.payload.data.length, addCommentArticle: true, selectId: ''};

    case "comments/load-error":
      return { ...state, data: [], waiting: false, count: 0, addCommentArticle: true}; //@todo текст ошибки сохранить?

    case "comments/select":
      return { ...state, data: action.payload.data, waiting: false, count: action.payload.data.length-1, addCommentArticle: false, selectId: action.selectId};

    case "comments/cancellation":
      return { ...state, data: action.payload.data, waiting: false, count: action.payload.data.length, addCommentArticle: true, selectId: ''};

    case "comments/post-start":
      return { ...state, waitingComment: true};

    case "comments/post-success":
      return { ...state, data: action.payload.data, waiting: false, waitingComment: false, count: action.payload.data.length, addCommentArticle: true, selectId: ''};
    
    case "comments/post-success":
      return { ...state,  waitingComment: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
  