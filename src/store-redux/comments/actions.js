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
          url: `/api/v1/comments?search%5Bparent%5D=${id}&limit=*&fields=items(_id,text,dateCreate,author(_id,profile(name)),parent(_id,_type)),count`
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
      let selectId;
      let addFromComment;
      const arrComments = getState().comments.data.filter(comment => comment.parent._type !== "formComment")
      const select = arrComments.map(comment => {
        if (comment._id === _id) {
          comment.selected = true;
          selectId = comment._id;
          addFromComment = {
            _id: "formComment",
            parent: {
              _id: comment._id,
              _type: "formComment"
            }
          }
        } else {
          comment.selected = false;
        }
        return comment;
      })

      select.push(addFromComment);
      dispatch({type: 'comments/select', payload: {data: select}, selectId: selectId});
    }
  },

  cancellationComment: () => {
    return (dispatch, getState, services) => {
      const arrComments = getState().comments.data.filter(comment => comment.parent._type !== "formComment")
      const select = arrComments.map(comment => {
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
        const arrComments = getState().comments.data.filter(comment => comment.parent._type !== "formComment")
        const newComments = arrComments.slice();
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
  