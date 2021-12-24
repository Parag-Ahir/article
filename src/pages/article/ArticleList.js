import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getArticleList } from '../../services/article';
import { useHistory,useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { articles } from '../../store/article/actions';
const ArticleList = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [articleList, setArticleList] = useState([]);
    const articleListStore = useSelector((state) => state.articleList.articleList,shallowEqual);
    useEffect(() => {
        if (location && !location.state) {
            fetchArticleList();
        }
    }, []);
    const fetchArticleList = () => {
        getArticleList().then((success) => {
            if (success) {
                if (success.response && success.response.status === 200 && success.response.data) {
                    dispatch(articles(success.response.data));
                }
            }
        }).catch((err) => {
            toast.error('Something went wrong.')
        });
    }
    useEffect(() => {
        if (articleListStore && articleListStore.length > 0) {
            setArticleList(articleListStore);
        }
    },[articleListStore]);
    const handleOnClickArticle = (id) => {
        history.push({ pathname: '/articledetail/' + id,state:{Id:id} })
    }
    const onClickAddArticle = () => {
        history.push({ pathname: '/addarticle' })
    }
    return (
        <div className="list flex-column hw100" >
            <div className='d-flex flex-row justify-content-between'>
                <h2 className='m-2'>Article List</h2>
                <button className='btn btn-primary m-2' onClick={()=>{onClickAddArticle()}}><i className="bi bi-plus-circle"></i> Add Article</button>
            </div>
            {
                (articleList && articleList.length > 0) &&
                articleList.map((article, index) => {
                    return (
                        <div key={article.id} className="card m-1 bg-light pointer" onClick={() => { handleOnClickArticle(article.id) }}>
                            <div className="card-body">
                                {index + 1}. {article.title}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ArticleList
