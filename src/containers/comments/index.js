import {memo, useCallback, useState} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import SideLayout from "../../components/side-layout";
import Spinner from "../../components/spinner";
import ListComments from "../../components/list-comments";
import ItemComment from "../../components/item-comment";
import Field from "../../components/field";
import AddComment from "../../components/add-comment";
import ButtonComment from "../../components/button-comment";
import Textarea from "../../components/textarea";
import NoLoginComment from "../../components/no-login-comment";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import articleComments from '../../store-redux/comments/actions';
import shallowequal from "shallowequal";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

function CatalogFilter() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    // Параметры из пути /articles/:id
    const params = useParams();

    const [data, setData] = useState({
      text: ''
    });

    useInit(() => {
      dispatch(articleComments.load(params.id));
    }, [params.id]);

    const select = useSelectorRedux(state => ({
        comments: treeToList(listToTree(state.comments.data), (item, level) => (
          {
            _id: item?._id,
            author: {
              _id: item?.author?._id,
              profile: {
                name: item?.author?.profile?.name
              }
            },
            parent: {
              _type: item.parent._type
            },
            dateCreate: item?.dateCreate,
            text: item?.text,
            selected: item?.selected || false,
            level,
          }
        )),
        countComments: state.comments.count,
        waiting: state.comments.waiting,
        addCommentArticle: state.comments.addCommentArticle,
        selectId: state.comments.selectId,
        waitingComment: state.comments.waitingComment
    }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

    const callbacks = {
      onSignIn: useCallback(() => {
        navigate('/login', {state: {back: location.pathname}});
      }, [location.pathname]),
      selectComment: useCallback((_id) => {
        dispatch(articleComments.selectComment(_id));
      }, [select]),
      cancellationComment: useCallback(() => {
        dispatch(articleComments.cancellationComment());
      }, [select]),
      onChange: useCallback((value, name) => {
        setData(prevData => ({...prevData, [name]: value}));
      }, []),
      // Отправка данных формы для коментария
      onSubmit: useCallback((e) => {
        e.preventDefault();
        const parent = () => {
          if (select.selectId) {
            return {
              "_id":select.selectId,
              "_type":"comment"
            }
          } else {
            return {
              "_id":params.id,
              "_type":"article"
            }
          }
        }
        let checkEmptiness = data.text;
        checkEmptiness.trim();
        if (checkEmptiness) {
          setData({
            text: ''
          });
          dispatch(articleComments.postComment(data.text, parent(), selectSession?.user?.profile?.name));
        } else {
          alert('Текст не должен быть пустым')
        }
      }, [data, select]),
    }

    const selectSession = useSelector(state => ({
        exists: state.session.exists,
        user: state.session.user
    }));

    const renders = {
      itemComment: useCallback((comment) => (
        <ItemComment comment={comment}
                    selectComment={callbacks.selectComment}
                    user={selectSession.user}
        />
      ), [selectSession, select]),
      newСomment: useCallback(() => {
        if (selectSession.exists) {
          return (
            <Spinner active={select.waitingComment}>
              <form onSubmit={callbacks.onSubmit}>
                <AddComment>
                  <Field>
                    <Textarea theme="textarea-comment" name="text" value={data.text} onChange={callbacks.onChange}/>
                  </Field>
                  <ButtonComment cancellationComment={callbacks.cancellationComment} addCommentArticle={select.addCommentArticle}/>
                </AddComment>
              </form>
            </Spinner>
          )
        } else {
          return <NoLoginComment onSignIn={callbacks.onSignIn} addCommentArticle={select.addCommentArticle} cancellationComment={callbacks.cancellationComment}/>
        }
      }, [selectSession, select]),
    };

    return (
        <Spinner active={select.waiting}>
            <ListComments comments={select.comments} 
                          renderComment={renders.itemComment} 
                          count={select.countComments}
                          newСomment={renders.newСomment}>
                            {select.addCommentArticle && (renders.newСomment())}
            </ListComments>
        </Spinner>
    )
}

export default memo(CatalogFilter);
