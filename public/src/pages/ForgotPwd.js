import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import ForgotPwdFormContainer from '../containers/ForgotPwdFormContainer.js';

class ForgotPwd extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="products_new"/>
        <ForgotPwdFormContainer />
      </div>
    );
  }
}


export default ForgotPwd;
