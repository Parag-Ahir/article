import { applyMiddleware, store, createStore,combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import CreateSagaMiddleware from 'redux-saga';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import main from '../sagas/index';
import { articleReducer } from './article/reducer';

const reducer = combineReducers({
    articleList : articleReducer
});

const rootReducer = (state, action)=>{
    return reducer(state, action);
}
const mainReducer = storage.reducer(rootReducer);
const engine = createEngine('Article');

const storageMiddleware = storage.createMiddleware(engine, [], []);
const logger = createLogger();

export default function storeConfigure() {
    const sagaMiddleware = CreateSagaMiddleware();
    const store = createStore(mainReducer, applyMiddleware(sagaMiddleware, storageMiddleware, logger));
    sagaMiddleware.run(main);
    const load = storage.createLoader(engine);
    load(store);
    return store;
}