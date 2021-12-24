import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './assets/css/main.css';
import { toast } from 'react-toastify';
import ArticleList from './pages/article/ArticleList';
import ArticleDetail from './pages/article/ArticleDetail';
import { AddArticle } from './pages/article/AddArticle';
import { Provider } from 'react-redux';
import storeConfigure from './store';

toast.configure({ closeButton: false, closeOnClick: true, className: 'toaster', autoClose: 2500 });
const store = storeConfigure();
const AppMain = () => {
  return (
    <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/list" component={ArticleList} />
            <Route exact path="/articledetail/:Id" component={ArticleDetail} />
            <Route exact path="/addarticle" component={AddArticle} />
          </Switch>
        </Router>
    </Provider>
  )
}
ReactDOM.render(
    <AppMain />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
