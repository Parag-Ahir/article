import React, { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addArticle } from '../../services/article';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addNewArticle } from '../../store/article/actions';
import { Spinner } from 'react-bootstrap';
export const AddArticle = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const articleList = useSelector((state) => state.articleList.articleList, shallowEqual);
    const { register, errors, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    });

    const onAddClick = (data) => {
        const request = {
            title: data.title,
            body: data.description,
            id: 101
        }
        setIsLoading(true);
        addArticle(request).then((success) => {
            setIsLoading(false);
            if (success) {
                if (success.response && success.response.status === 201) {
                    let data = {};
                    if (articleList && articleList.length > 0) {
                        data = { ...success.response.data, id: articleList.length + 1 };
                    } else {
                        data = success.response.data;
                    }
                    dispatch(addNewArticle(data));
                    history.push({ pathname: '/list', state: { from: 'add_Article' } })
                }
            }
        }).catch((err) => {
            toast.error('Something went wrong.');
            setIsLoading(false);
        });
    }
    const onResetClick = () => {
        setValue('title', '');
        setValue('description', '');
    }
    return (
        <div className="d-flex main hw100">
            <div className="form-signin mwmt" >
                <div className="card shadow-sm">
                    <div className="card-header fw-bold">Add Article</div>
                    <div className="card-body p-4">
                        <div className="col-md-12">
                            <label className="form-label fw-bold">Title</label>
                            <input type="text" className="form-control" placeholder="Title" name="title" ref={register({ required: true })} />
                            {(errors && errors.title && errors.title.type === 'required') && <span className="text-danger">Title is Required.</span>}
                        </div>
                        <div className="col-md-12 mt-2">
                            <label className="form-label fw-bold">Body</label>
                            <textarea type="Description" className="form-control" placeholder="Description" name="description" ref={register({ required: true })} />
                            {(errors && errors.description && errors.description.type === 'required') && <span className="text-danger">Description is Required.</span>}
                        </div>
                        <div className="d-flex justify-content-end mt-4 ">
                            <button className="btn btn-primary m-1" onClick={handleSubmit(onAddClick)}>
                                {
                                    (isLoading) &&
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                }
                                Save</button>
                            <button className="btn btn-secondary m-1" onClick={() => { onResetClick() }}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
