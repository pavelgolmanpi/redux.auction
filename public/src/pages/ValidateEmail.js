import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import ValidateEmailAlertContainer from '../containers/ValidateEmailAlertContainer.js';

class ValidateEmail extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="products_new"/>
        <ValidateEmailAlertContainer token={this.props.match.params.token} autoValidateToken={true}/>
      </div>
    );
  }
}


export default ValidateEmail;
