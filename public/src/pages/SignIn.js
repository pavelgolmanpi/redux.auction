import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import SignInFormContainer from '../containers/SignInFormContainer.js';

class SignIn extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="products_new"/>
        <SignInFormContainer />
      </div>
    );
  }
}


export default SignIn;
