export const addNewArticle = (article) => {
    return {
        type: 'ADD_ARTICLE',
        payload:article
    }
}
export const articles = (articles) => {
    return {
        type: 'ARTICLES',
        payload:articles
    }
}