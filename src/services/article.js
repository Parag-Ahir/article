import Axios from 'axios';

export const getArticleList = () => {
    return Axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => ({ response }),
         error => ({ error }));
}
export const addArticle = (request) => {
    return Axios.post('https://jsonplaceholder.typicode.com/posts', request)
        .then(response => ({ response }),
        error => ({ error }));
}
export const getArticleDetail = (id) => {
    return Axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
        .then(response => ({ response }),
        error => ({ error }));
}