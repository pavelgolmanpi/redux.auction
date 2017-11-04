import React from 'react';
import {  Switch, Route, BrowserRouter } from 'react-router-dom'
import App from './pages/App';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={App}/>
      <Route path='/signin' component={SignIn}/>
      <Route path='/signup' component={SignUp}/>
    </Switch>
    </BrowserRouter>
)

export default Routes