import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';
import { getArticleDetail } from '../../services/article';
import { toast } from 'react-toastify';
const ArticleDetail = () => {
    const [article, setArticle] = useState('');
    const location = useLocation();
    const history = useHistory();
    const articleList = useSelector((state) => state.articleList.articleList, shallowEqual);
    
    useEffect(() => {
        if (location && location.state && location.state.Id && location.state.Id <= 100) {
            getArticleDetail(location.state.Id).then((success) => {
                if (success) {
                    if (success.response && success.response.status === 200 && success.response.data) {
                        setArticle(success.response.data);
                    }
                }
            }).catch((err) => {
                toast.error('Something went wrong.')
            });
        } else {
            if (location.state.Id > 100) {
                let getArticle = articleList.find((article) => article.id === location.state.Id);
                if (getArticle) {
                    setArticle(getArticle)
                }
            }
        }
        
    }, []);
    const onClickBack = () =>{
        history.go(-1);
    }
    return (
        <div className="list flex-column hw100">
            <div className='d-flex flex-row justify-content-between'>
                <h2 className='m-2'>Article Details</h2>
                <button className='btn btn-secondary m-2' onClick={()=>{onClickBack()}}><i className="bi bi-arrow-left"></i> Back</button>
            </div>
            <div className="card m-3" style={{width:'48rem'}}>
                <div className="card-body">
                    <h5 className="card-title">Title : {article && article.title ? article.title : ''}</h5>
                    <p className="card-text"><span className='fw-bold'>Body :</span> {article && article.body ? article.body : ''}</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleDetail
