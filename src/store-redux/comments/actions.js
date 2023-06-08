export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search%5Bparent%5D=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
        });
        // Комментариии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  selectComment: (_id) => {
    return (dispatch, getState, services) => {
      let selectId
      const select = getState().comments.data.map(comment => {
        if (comment._id === _id) {
          comment.selected = true;
          selectId = comment._id
        } else {
          comment.selected = false;
        }
        return comment;
      })
      dispatch({type: 'comments/select', payload: {data: select}, selectId: selectId});
    }
  },

  cancellationComment: () => {
    return (dispatch, getState, services) => {
      const select = getState().comments.data.map(comment => {
        comment.selected = false;
        return comment;
      })
      dispatch({type: 'comments/cancellation', payload: {data: select}});
    }
  },

  postComment: (text, parent, userName) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/post-start'});

      const body = {
        text: text,
        parent
      }

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile)`,
          method: 'POST',
          body: JSON.stringify(body)
        });
        const newComments = getState().comments.data.slice();
        newComments.push(res.data.result);

        const select = newComments.map(comment => {
          comment.selected = false;
          return comment;
        })
        // Комментариии загружены успешно
        dispatch({type: 'comments/post-success', payload: {data: select}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  }
}
  