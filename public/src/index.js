import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, browserHistory, Route, IndexRoute, Switch } from 'react-router-dom';
//import routes from './routes';
import configureStore from './store/configureStore.js';


import App from './pages/App';
import PostsIndex from './pages/PostsIndex';
import PostsNew from './pages/PostsNew';
import PostsShow from './pages/PostsShow';
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

    <Route exact path="/" component={PostsIndex} />
      <Route exact path="posts/new" component={PostsNew} />
      <Route exact path="posts/:id" component={PostsShow} />
      <Route exact path="/signin" component={SignIn} />
      <Route pexact ath="/signup" component={SignUp} />
      <Route exact path="/forgotPwd" component={ForgotPwd} />
      <Route exact path="/validateEmail/:token" component={ValidateEmail} />
      <Route exact path="/profile" component={Profile} />


      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('body'));
