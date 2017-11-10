import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, browserHistory, Route, IndexRoute, Switch } from 'react-router-dom';
//import routes from './routes';
import configureStore from './store/configureStore.js';


import App from './pages/App';
import ProductsIndex from './pages/ProductsIndex';
import ProductsNew from './pages/ProductsNew';
import ProductsShow from './pages/ProductsShow';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPwd from './pages/ForgotPwd';
import ValidateEmail from './pages/ValidateEmail';
import Profile from './pages/Profile';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
    <Switch>

    <Route exact path="/" component={ProductsIndex} />
      <Route path="/profile" component={Profile} />
      <Route exact path="/products/new" component={ProductsNew} />
      <Route  path="/products/:id" component={ProductsShow} />
      <Route exact path="/signin" component={SignIn} />
      <Route pexact ath="/signup" component={SignUp} />
      <Route exact path="/forgotPwd" component={ForgotPwd} />
      <Route exact path="/validateEmail/:token" component={ValidateEmail} />



      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('body'));
