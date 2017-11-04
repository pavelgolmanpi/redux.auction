import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import SignInFormContainer from '../containers/SignInFormContainer.js';

class PostsNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <SignInFormContainer />
      </div>
    );
  }
}


export default PostsNew;
