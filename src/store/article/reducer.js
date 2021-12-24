const mainState = {
    articleList:[]
}

export const articleReducer = (state=mainState,action) =>{
    switch (action.type) {
        case 'ARTICLES':
            return {
                ...state,
                articleList:action.payload
            }
        case 'ADD_ARTICLE':
            return {
                ...state,
                articleList:[...state.articleList,action.payload]
            }
        default:
            return state;
    }
}